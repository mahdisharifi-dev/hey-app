import Logo from "./Logo";

export default function Loader(props) {
    return (
        <div className="h-full flex-1 flex items-center justify-center">
            <Logo loading white={props.white} />
        </div>
    );
}
