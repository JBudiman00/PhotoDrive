import ToggleButton from '../components/buttonToggle';
import Select from 'react-select';

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
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="SearchSelect"
                options={option} 
                onChange={(e) => {
                    if(e == null){
                        props.setAlbums({});
                    } else {
                        props.setAlbums(e);
                    }
                }}
            />}
        </div>
    );
}