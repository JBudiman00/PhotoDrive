import axios from 'axios';
import Select from 'react-select';
import { useEffect, useState } from 'react';

interface albumInterface{
    album_id: number,
    album_name: string,
    date: string,
    user_id: number
}
interface userPermissions{
    email: string,
    name: string,
    user_id: number
}
interface albumInfo {
    albums: albumInterface
    albumList: Array<any>
    setUserPerm: any,
    userPerm: any,
    setAlbums: any,
    perm: Array<userPermissions>,
    setPerm: any,
    addStatus: string,
    setAddStatus: any
}

export default function AlbumInfo (props: albumInfo){
    //Variable to hold add user form submission
    const [email, setEmail] = useState<string>("");

    //Available albums for selection in dropdown menu
    const option = props.albumList.map((item: any) => {
        return {value: item, label: item.album_name}
    })

    //Show all users not in album
    //Not corretly putting in data
    const userOption = props.perm.map((item: any) => {
        return {value: item, label: item.name}
    })

    //UseEffect to update user permissions based on user selection
    useEffect(() => {
        const getPerm = async () => {
          if (props.albums.album_id) {
            const permissions = props.userPerm.find((i:any) => i.album_id === props.albums.album_id);
            if (permissions != undefined) {
              props.setPerm(permissions.user);
            }
          }
        };
    
        getPerm();
      }, [props.albums.album_id, props.userPerm, props.addStatus]);

    //Post request to delete user from database
    const deleteUser = (user_id: number, album_id: number) => {
        axios.delete('http://localhost:8000/albums/' + album_id + '/users/' + user_id, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            props.setAddStatus("User successfully removed from album");
        });
    }

    //Post request to add user to database
    const addUser = async (e: any) => {
        e.preventDefault();
        if(email?.trim().length === 0){
            console.log('Input value is empty');
            props.setAddStatus('Email field is empty');
            return;
        }
        try{
            const user_id: number = await axios.get('http://localhost:8000/users/' + email)
            .then((response) => {
                return response.data.user_id
            });

            await axios.post('http://localhost:8000/albums/' + props.albums.album_id + '/users/' + user_id, { withCredentials: true })
            .then((response) => {
                props.setAddStatus("User successfully added to album");
            })
        } catch(err: any){
            console.log(err.response.status)
            if (err.response.status === 404){
                console.log("Unable to find user with given email");
                props.setAddStatus("Unable to find user with given email")
            } else if(err.response.status == 409){
                console.log("User already in album");
                props.setAddStatus("User already in album")
            } else {
                console.error(err);
            }
        }
    }

    //Initialize album selection update
    const albumSelect = async (e: any) => {
        if(e == null){
            props.setAlbums({});
            props.setPerm([]);
        } else {
            props.setAlbums(e.value);
        }
    }
    
    return (
        <div className="flex flex-col items-center">
            <Select 
                className="basic-single mt-2"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="SearchSelect"
                options={option} 
                onChange={(e) => {albumSelect(e)}}
            />
            <div className="text-center w-5/6">
                <p>{props.albums.album_name}</p>
                <p>{props.albums.date}</p>
                <p>Shared with</p>
                {props.perm.map((item: any) => {
                    return (
                        <div key={item.user_id} className="flex flex-row bg-[#394867] text-[#F1F6F9] h-10 rounded-2xl my-2 text-lg items-center">
                            <p className="w-5/6">{item.name}</p>
                            <div className="flex w-1/6 justify-end">
                                <img onClick={() => deleteUser(item.user_id, props.albums.album_id)} src="deleteicon.png" className="h-6 mr-2"/>
                            </div>
                        </div>
                    );
                })}
                <form onSubmit={addUser}>
                    {/* May add selection feature if time available */}
                    {/* <Select 
                        className="basic-single mt-2"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="UserSubmit"
                        options={userOption} 
                    /> */}
                    <input 
                        type="text"
                        onChange={((e: any) => setEmail(e.target.value))}
                        className="w-2/3 text-xl py-1"    
                    />
                    <button type="submit" className="bg-[#394867] text-[#FFFFFF] rounded-lg p-2 mt-2">Submit</button>
                </form>
                <p>{props.addStatus}</p>
            </div>
        </div>
    )
}