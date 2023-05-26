interface PhotoInterface {
    albums: {
        value: number,
        label: string
    },
    photoList: Array<any>,
    //Toggle equals true for all photos and false for album only
    toggle: boolean
}

export default function PhotoDisplay (props: PhotoInterface) {
    const display = () => {
        const album_id = props.albums.value;
        const list = props.photoList.map((item: any) => {
            //Adding blue highlight and showing images beloing to selected album
            if((!(item.photoalbums === undefined) && item.photoalbums.some((e: any) => e.album_id === album_id))){
                return (
                    <div className="flex flex-col items-center grid-span-1 h-48" key={item.img_id}>
                        <img className="border-2 border-blue-500" src={item.img}/>
                        <p>{item.img_name}</p>
                    </div>
                );
            }
            //If toggle for photo selection is true, return image not belonging to selected album
            //without a blue highlight
            if(props.toggle == true){
                return (
                    <div className="flex flex-col items-center grid-span-1 h-48" key={item.img_id}>
                        <img src={item.img}/>
                        <p>{item.img_name}</p>
                    </div>
                );
            }
        })

        return list
    } 
    
    // const list = props.photoList.map((item: any) => {
        
    //     //Only return photos in albums selected by user
    //     //Still not complete; need to deal with case where photo belongs to more than 1 album
    //     if(props.albums.length == 0 || (!(item.photoalbums[0] === undefined) && props.albums.some((e: any) => e.album_id === item.))){
    //         return (
    //             <div className="flex flex-col items-center grid-span-1 h-48">
    //                 <img key={item.img_id} src={item.img}/>
    //                 <p>{item.img_name}</p>
    //             </div>
    //         );
    //     }
    // })
    
    return (
        <>
            {display()}
        </>
    );
}