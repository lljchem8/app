import React from "react";

const Search = ({ placeholder, onChange, refLink }) => {
	return (
		<div className="md-form mt-0">
			<input
				ref={refLink}
				className="form-control"
				type="text"
				placeholder={placeholder}
				aria-label="Search"
				onChange={e => onChange(e)}
			/>
		</div>
	);
};

export default Search;
