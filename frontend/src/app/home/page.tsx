'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoToggle from '../components/photoToggle';
import AlbumToggle from '../components/albumToggle';
import PhotoDisplay from '../components/photoDisplay';
import { useRouter } from 'next/navigation';


export default function Home() {
    //Toggle button between viewing all photos and album-specific
    const [toggle, setToggle] = useState(true);
    //Toggle button between viewing personal albums and shared albums
    const [toggleAlbum, setToggleAlbum] = useState(true);
    //Array storing all photos for a user
    const [photoList, setPhotoList] = useState<any>([]);
    //Array storing all albums for a user
    const [albumList, setAlbumList] = useState<any>([]);
    //Array storing user-selected albums for viewing
    const [albums, setAlbums] = useState<any>([]);
    const router = useRouter();

    //Retrieve all albums and photos belonging to the user at the beginning of the cycle
    useEffect(() => {
        axios.get("http://localhost:8000/albums", { withCredentials: true })
        .then((response: any) => {
            console.log(response);
            setAlbumList(response.data);
        }).catch(error => {
            console.log(error.response.data);
            if(error.response.data == "Unauthorized"){
                router.push('/login');
            }
        });

        axios.get("http://localhost:8000/photos", { withCredentials: true })
        .then((response: any) => {
            console.log(response.data)
            setPhotoList(response.data)
        }).catch(error => {
            console.log(error.response.data);
        });
    }, []);

    return (
        <>
        <div className="flex flex-col h-[calc(100vh-74px)]">
            <div className="grid grid-cols-5 flex-grow">
                <div className="col-span-1 bg-[#D9D9D9]">
                    <AlbumToggle item1="Personal albums" item2="Shared albums" 
                    toggleAlbum={toggleAlbum} setToggleAlbum={setToggleAlbum} 
                    albums={albums} setAlbums={setAlbums} albumList={albumList}/>
                </div>
                <div className="col-span-4">
                    <PhotoToggle item1="All photos" item2="Album only" toggle={toggle} setToggle={setToggle} />
                    <div className="h-4"></div>
                    <div className="grid grid-cols-5">
                        {/* {photoList.map((item: any) => {
                            //Return all photos if no albums are selected by user
                            //Only return photos in albums selected by user
                            //Still not complete; need to deal with case where photo belongs to more than 1 album
                            if(albums.length == 0 || (!(item.photoalbums[0] === undefined) && albums.includes(item.photoalbums[0].album_id))){
                                return (
                                    <div className="flex flex-col items-center grid-span-1 h-48">
                                        <img key={item.img_id} src={item.img}/>
                                        <p>{item.img_name}</p>
                                    </div>
                                );
                            } 
                        })} */}
                        <PhotoDisplay albums={albums} photoList={photoList} toggle={toggle}/>
                    </div>
                </div>
            </div>    
        </div>
        </>
    )
}