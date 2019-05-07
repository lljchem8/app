import React from "react";

const CollapseButton = ({ display, onClick }) => {
	return (
		<React.Fragment>
			<p>
				<button
					data-toggle="collapse"
					href="collapseExample"
					className=".btn-large"
					onClick={e => onClick(e)}
					display={display}
				>
					{display === "true" ? "-" : "+"}
				</button>
			</p>
		</React.Fragment>
	);
};

export default CollapseButton;
