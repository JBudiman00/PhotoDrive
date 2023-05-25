import ToggleButton from '../components/buttonToggle';

export default function photoToggle (props: any) {
    return (
        <div className="grid grid-cols-2 mt-2">
            <div className="flex flex-row">
                {<ToggleButton text1={props.item1} text2={props.item2} toggle={props.toggle} setToggle={props.setToggle}/>}
            </div>
            <div className="flex flex-row justify-end">
                <input className="rounded-2xl"/>
            </div>
        </div>
    );
}