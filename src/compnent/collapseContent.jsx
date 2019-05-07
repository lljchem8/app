import React from "react";
import Tag from "./tag";

const CollapeContent = props => {
	return (
		<div
			className={props.display === "true" ? "collapse.show" : "collapse"}
			id="collapseContent"
		>
			<div className="card card-body panel-footer panel-primary">
				<ul className="scores-list m-0">
					{props.scores.map((score, index) => (
						<li key={index} className="list-unstyled">
							test {index + 1}: {score}%
						</li>
					))}
				</ul>
			</div>
			<Tag
				studentId={props.studentId}
				tags={props.tags}
				handleAddition={props.handleAddition}
			/>
		</div>
	);
};

export default CollapeContent;
