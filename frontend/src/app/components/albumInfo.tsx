import axios from 'axios';
import Select from 'react-select';
import { useEffect } from 'react';

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
    setPerm: any
}

export default function AlbumInfo (props: albumInfo){
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
      }, [props.albums.album_id, props.userPerm]);

    //Post request to delete user from database
    const deleteUser = (user_id: number, album_id: number) => {
        axios.delete('http://localhost:8000/albums/' + album_id + '/users/' + user_id, { withCredentials: true })
        .then((response) => {
            console.log(response.data)
        })
    }

    //Post request to add user to database
    const addUser = (user_id: number, album_id: number) => {
        axios.delete('http://localhost:8000/albums/' + album_id + '/users/' + user_id, { withCredentials: true })
        .then((response) => {
            console.log(response.data)
        })
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
            <div className="text-center">
                <p>{props.albums.album_name}</p>
                <p>{props.albums.date}</p>
                <p>Shared with</p>
                {props.perm.map((item: any) => {
                    return (
                        <div key={item.user_id} className="flex flex-row bg-[#394867] text-[#F1F6F9] h-10 rounded-2xl pl-2 my-2 text-lg items-center">
                            <p className="w-5/6">{item.name}</p>
                            <img onClick={() => deleteUser(item.user_id, props.albums.album_id)} src="deleteicon.png" className="h-6 items-end"/>
                        </div>
                    );
                })}
                <form>
                    <Select 
                        className="basic-single mt-2"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="UserSubmit"
                        options={userOption} 
                        onChange={(e) => {albumSelect(e)}}
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}