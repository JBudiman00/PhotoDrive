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
    setAddStatus: any,
    setStatus: any,
    toggleAlbum: boolean
}

export default function AlbumInfo (props: albumInfo){
    //Variable to hold add user form submission
    const [email, setEmail] = useState<string>("");
    //Variable to determine whether to open or close add album popup
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [albumSelected, setAlbumSelected] = useState<boolean>(false);

    //Available albums for selection in dropdown menu
    const option = props.albumList.map((item: any) => {
        return {value: item, label: item.info.album_name}
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

        //If show is true, display album selected
        if(Object.keys(props.albums).length != 0){
            setAlbumSelected(true);
        } else {
            setAlbumSelected(false);
        }
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
            console.log(err.response.data.message);
            props.setAddStatus(err.response.data.message)
        }
    }

    //Initialize album selection update
    const albumSelect = async (e: any) => {
        if(e == null){
            props.setAlbums({});
            props.setPerm([]);
            props.setAddStatus("");
        } else {
            props.setAlbums(e.value);
            props.setAddStatus("");
        }
    }

    const onClick = (e: any) => {
        e.preventDefault();
        //Album ID to be deleted
        const id = props.albums.album_id

        //API
        axios({
            method: "delete",
            url: 'http://localhost:8000/albums/' + id,
            // data: {album_id: id},
            // headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            console.log(response);
            //Regenerate API call
            props.setStatus(true);
            //Reset selected album
            props.setAlbums({});
        })
        .catch((response) => {
            console.log(response)
        });
    }
    //Component to add new album
    function AddAlbum(){
        const [albumName, setAlbumName] = useState("");
        
        const handleSubmit = (e: any) => {
            e.preventDefault();
            if(albumName != ""){
                //API
                axios({
                    method: "post",
                    url: 'http://localhost:8000/albums',
                    data: {album_name: albumName},
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    console.log(response);
                    setIsOpen(false);
                    props.setStatus(true);
                })
                .catch((response) => {
                    console.log(response)
                });
            }
        }

        return(
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
                <div className="relative bg-white rounded-lg p-8">
                    <div className="absolute top-0 right-0 p-4">
                        <button
                            className="text-gray-500 hover:text-gray-800"
                            onClick={(e:any) => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-center">Create Album</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center">
                            <p className="mb-2">Album Name
                                <input 
                                    type="text" 
                                    value={albumName} 
                                    onChange={(e:any) => setAlbumName(e.target.value)} 
                                    className="bg-[#D9D9D9] rounded-lg w-2/3 ml-1"
                                />
                            </p>
                            <input type="submit" className="bg-[#212A3E] text-[#F1F6F9] rounded-full py-2 w-1/2"/>
                        </div>
                    </form>
                </div>
                </div>
            )}
        </>
        );
    }

    const handleClick = (e: any) => {
        e.preventDefault();
        setIsOpen(true);
    }
    
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
                {props.toggleAlbum && 
                    <button className="flex rounded-full text-4xl justify-center items-center bg-[#212A3E] text-[#F1F6F9] h-10 w-10 pb-1 mt-2 mr-1"
                        onClick={handleClick}>
                        +
                    </button>
                }
                <Select 
                    className="basic-single mt-2"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="SearchSelect"
                    options={option} 
                    onChange={(e) => {albumSelect(e)}}
                />
            </div>
            {albumSelected && props.toggleAlbum &&
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
                        <input 
                            type="text"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}

                            className="w-2/3 text-xl py-1"    
                        />
                        <button type="submit" className="bg-[#394867] text-[#FFFFFF] rounded-lg p-2 mt-2">Submit</button>
                    </form>
                    <p>{props.addStatus}</p>
                    <div className="h-6"></div>
                    <div className="bg-[#F90000] rounded-lg m-auto w-1/3 p-1" onClick={onClick}>
                        <p>Delete</p>
                    </div>
                </div>
            }
                <AddAlbum />
        </div>
    )
}