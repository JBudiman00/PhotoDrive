import ToggleButton from '../components/buttonToggle';
import Select from 'react-select'

export default function albumToggle (props: any) {
    const option = props.albumList.map((item: any) => {
        return {value: item.album_id, label: item.album_name}
    })

    return (
        <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center mt-2">
            {<ToggleButton text1={props.item1} text2={props.item2} toggle={props.toggleAlbum} setToggle={props.setToggleAlbum}/>}
        </div>
            {<Select 
                isMulti
                className="basic-multi-select my-2 w-2/3"
                classNamePrefix="select"
                onChange={(e: any) => {
                    const arr = e.map((item: any) => {
                        return item.value
                    })
                    props.setAlbums(arr);
                }}
                // value={albumList}
                options={option} 
            />}
        </div>
    );
}