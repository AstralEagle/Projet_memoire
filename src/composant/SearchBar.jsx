import React, {useRef} from "react";
import "./SearchBar.css";


const SearchBar = ({onSearch}) => {
    const inputRef = useRef();

    const submit = (e) => {
        onSearch(inputRef.current.value);
        e.preventDefault();
    };
    return (
        <div className="div_search">
            <form className="form_search" onSubmit={submit} data-testid="form_input">
                <input ref={inputRef} className="input_search" name="search" type="text" placeholder="Ville" data-testid="text_input" />
                <input className="input_submit" type="submit" data-testid="submit_input"/>
            </form>
        </div>
    );
};


export default SearchBar;