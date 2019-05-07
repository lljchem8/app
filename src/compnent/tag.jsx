import React from "react";

const Tag = ({ tags, handleAddition, studentId }) => {
	const input = {
		border: 0,
		outline: 0,
		borderBottom: "1px solid black"
	};
	return (
		<React.Fragment>
			<ul className="pb-1">
				{tags.map(tag => (
					<li
						key={tag.id}
						className="badge mr-1"
						style={{ backgroundColor: "#dee2e6" }}
					>
						{tag.text}
					</li>
				))}
			</ul>

			<div>
				<input
					id={studentId}
					style={input}
					type="text"
					className="ml-1"
					placeholder="Add a tag"
					onKeyDown={e => handleAddition(e)}
				/>
			</div>
		</React.Fragment>
	);
};

export default Tag;
