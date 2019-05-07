import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import axios from "axios";
import Student from "./compnent/student";
import Search from "./compnent/search";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rawData: [],
			studentsContent: []
		};
		this.searchByName = React.createRef();
		this.searchByTag = React.createRef();
	}

	async componentDidMount() {
		const response = await axios.get(
			"https://www.hatchways.io/api/assessment/students"
		);
		const rawData = response.data.students;
		let tags = [];
		const studentsContent = rawData.map(student => ({
			...student,
			tags
		}));
		this.setState({ studentsContent, rawData: studentsContent });
	}

	// handle adding tag in tag.jsx
	handleAddition = event => {
		if (event.keyCode === 13) {
			const student = this.state.studentsContent.map(student => {
				if (student.id === event.target.id) {
					const tag = event.currentTarget.value;
					let { tags, ...other } = student;
					tags = [...tags, { id: tags.length + 1, text: tag }];
					student = { tags, ...other };
				}
				return student;
			});
			this.setState({ rawData: student, studentsContent: student });
			//clear the value in input feild, in tag.jsx
			event.currentTarget.value = "";
		}
	};

	// search by name, search bar
	handleSearchByName = e => {
		// before handling search by name, first check what we have in search by tag box
		let studentsContentCopy = [...this.state.rawData];
		studentsContentCopy = studentsContentCopy.filter(student =>
			this.matchByTag(student, this.searchByTag.current.value)
		);

		//search by name
		let studentsContentOutput = studentsContentCopy.filter(student =>
			this.matchByName(student, e.currentTarget.value)
		);
		this.setState({ studentsContent: studentsContentOutput });
	};

	// search by tag, search bar
	handleSearchByTag = e => {
		// before handling search by tag, first check what we have in search by name box
		let studentsContentCopy = [...this.state.rawData];
		studentsContentCopy = studentsContentCopy.filter(student =>
			this.matchByName(student, this.searchByName.current.value)
		);

		//search by tag
		let studentsContentOutput = studentsContentCopy.filter(student =>
			this.matchByTag(student, e.currentTarget.value)
		);
		this.setState({ studentsContent: studentsContentOutput });
	};

	matchByName = (student, input) => {
		const firstNameMatch = student.firstName
			.toLowerCase()
			.startsWith(input.toLowerCase());
		const lastNameMatch = student.lastName
			.toLowerCase()
			.startsWith(input.toLowerCase());

		return firstNameMatch || lastNameMatch;
	};

	matchByTag = (student, input) => {
		if (input === "") return true;
		const tags = student.tags;
		if (tags.length !== 0) {
			for (const tag of tags) {
				if (tag.text.toLowerCase().startsWith(input.toLowerCase())) return true;
			}
		}
		return false;
	};

	render() {
		const { studentsContent } = this.state;
		return (
			<React.Fragment>
				<Search
					onChange={this.handleSearchByName}
					placeholder="Search by name"
					refLink={this.searchByName}
				/>
				<Search
					onChange={this.handleSearchByTag}
					placeholder="Search by tag"
					refLink={this.searchByTag}
				/>
				<ul className="student-list m-0">
					{studentsContent.length !== 0 &&
						studentsContent.map((studentContent, index) => (
							<li key={index} className="list-unstyled mt-2">
								<Student
									student={studentContent}
									handleAddition={this.handleAddition}
								/>
							</li>
						))}
				</ul>
			</React.Fragment>
		);
	}
}

export default App;
