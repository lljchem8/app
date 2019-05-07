import React, { Component } from "react";
import CollapseButton from "./collapseButton";
import CollapseContent from "./collapseContent";

class Student extends Component {
	state = {
		displayStatus: "false" //collapse display
	};

	calAverageScore = scores => {
		let sum = 0;
		for (let i = 0; i < scores.length; i++) {
			sum += parseInt(scores[i]);
		}
		return sum / scores.length + "%";
	};

	handleClick = e => {
		if (this.state.displayStatus === "true") {
			this.setState({ displayStatus: "false" });
		} else {
			this.setState({ displayStatus: "true" });
		}
	};

	render() {
		const { student, handleAddition } = this.props;
		return (
			<div className="row align-items-center border-bottom">
				<div className="col-2 text-center pl-4">
					<img
						src={student.pic}
						className="rounded-circle border"
						alt="selfie"
					/>
				</div>
				<div className="text-container" className="col">
					<h2>
						{student.firstName} {student.lastName}
					</h2>
					<div className="description pl-4 pb-3">
						<p className="m-0"> Email: {student.email} </p>
						<p className="m-0"> Company: {student.company}</p>
						<p className="m-0"> Skill: {student.skill}</p>
						<p className="m-0">
							{" "}
							Average: {this.calAverageScore(student.grades)}
						</p>
					</div>

					<div>
						<CollapseContent
							display={this.state.displayStatus}
							scores={student.grades}
							studentId={student.id}
							tags={student.tags}
							handleAddition={handleAddition}
						/>
					</div>
				</div>
				<div className="col-2">
					<CollapseButton
						onClick={this.handleClick}
						display={this.state.displayStatus}
					/>
				</div>
			</div>
		);
	}
}

export default Student;
