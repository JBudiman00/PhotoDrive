'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoToggle from '../components/photoToggle';
import PhotoDisplay from '../components/photoDisplay';
import AlbumInfo from '../components/albumInfo'
import { useRouter } from 'next/navigation';
import ToggleButton from '../components/buttonToggle';

export default function Home() {
    //Interfaces
    //User-selected album interface
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

    //Toggle button between viewing all photos and album-specific
    const [toggle, setToggle] = useState(true);
    //Toggle button between viewing personal albums and shared albums
    const [toggleAlbum, setToggleAlbum] = useState(true);
    //Array storing all photos for a user
    const [personalPhotos, setPersonalPhotos] = useState<any>([]);
    //Array storing all shared photos for a user
    const [sharedPhotos, setSharedPhotos] = useState<any>([]);
    //Array storing all personal albums for a user
    const [personalAlbums, setPersonalAlbums] = useState<any>([]);
    //Array storing all shared albums for a user
    const [sharedAlbums, setSharedAlbums] = useState<any>([]);
    //Stores user-selected albums for viewing
    const [albums, setAlbums] = useState<albumInterface>({} as albumInterface);
    //Array storing view-permissions for all albums
    const [userPerm, setUserPerm] = useState<any>({});
    //Stores number representing view-permission selection for user selected albums
    const [perm, setPerm] = useState<Array<userPermissions>>([]);
    //Variable to set user adding view status 
    const [addStatus, setAddStatus] = useState<string>("");
    //Variable to rerender useeffect
    const [status, setStatus] = useState<boolean>(true);
    
    const router = useRouter();

    //Database GET calls
    useEffect(() => {
        //Fetch all user albums
        axios.get("http://localhost:8000/albums", { withCredentials: true })
        .then((response: any) => {
            setPersonalAlbums(response.data);
        })
        .catch(error => {
            console.log(error.response.data);
            if(error.response.data == "Unauthorized"){
                router.push('/login');
            }
        });

        //Fetch all user photos
        axios.get("http://localhost:8000/photos", { withCredentials: true })
        .then((response: any) => {
            setPersonalPhotos(response.data)
        }).catch(error => {
            console.log(error.response.data);
        });

        //Fetch all shared user photos
        axios.get("http://localhost:8000/photos/shared", { withCredentials: true })
        .then((response: any) => {
            setSharedPhotos(response.data)
        }).catch(error => {
            console.log(error.response.data);
        });

        //Fetch shared user information
        axios.get('http://localhost:8000/albums/all', { withCredentials: true })
        .then((response) => {
            setUserPerm(response.data)
        })

        //Fetch shared albums
        axios.get('http://localhost:8000/albums/shared', { withCredentials: true })
        .then((response) => {
            setSharedAlbums(response.data);
        })

        setStatus(false)
    }, [addStatus, status]);

    return (
        <>
        <div className="flex flex-col h-[calc(100vh-74px)]">
            <div className="grid grid-cols-5 flex-grow">
                <div className="col-span-1 bg-[#D9D9D9]">
                    <div className="h-2"></div>
                    <div onClick={() => {
                        setToggleAlbum(!toggleAlbum);
                        setAlbums({} as albumInterface);
                        }}>
                        <ToggleButton text1="Personal albums" text2="Shared albums" toggle={toggleAlbum}/>
                    </div>
                    {/* Album Sidebar Display */}
                    {toggleAlbum && (
                        <AlbumInfo albums={albums} albumList={personalAlbums} setUserPerm={setUserPerm} 
                        userPerm={userPerm} setAlbums={setAlbums} perm={perm} setPerm={setPerm}
                        addStatus={addStatus} setAddStatus={setAddStatus} setStatus={setStatus}
                        toggleAlbum={toggleAlbum}
                        />
                    )}
                    {!toggleAlbum && (
                        <AlbumInfo albums={albums} albumList={sharedAlbums} setUserPerm={setUserPerm} 
                        userPerm={userPerm} setAlbums={setAlbums} perm={perm} setPerm={setPerm}
                        addStatus={addStatus} setAddStatus={setAddStatus} setStatus={setStatus}
                        toggleAlbum={toggleAlbum}
                        />
                    )}
                </div>
                <div className="col-span-4">
                    <PhotoToggle item1="All photos" item2="Album only" toggle={toggle} setToggle={setToggle} setStatus={setStatus}/>
                    <div className="h-4"></div>
                    <div className="grid grid-cols-5">
                        {toggleAlbum && (
                            <PhotoDisplay albums={albums} photoList={personalPhotos} toggle={toggle} setStatus={setStatus} toggleAlbum={toggleAlbum}/>
                        )}
                        {!toggleAlbum && (
                            <PhotoDisplay albums={albums} photoList={sharedPhotos} toggle={toggle} setStatus={setStatus} toggleAlbum={toggleAlbum}/>
                        )}
                    </div>
                </div>
            </div>    
        </div>
        </>
    )
}