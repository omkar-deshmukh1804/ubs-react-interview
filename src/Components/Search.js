import React, { useState } from 'react';
import Error from './Error';
import ResidentsList from './ResidentsList';
import { STUDENTS } from '../studentsList';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected);
}



function Search() {

	const [userInputName, setUserInputName] = useState('')
	const [joiningDateInput, setJoiningDateInput] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [errorStatus, setErrorStatus] = useState(false)
	const [residenceList, setResidenceList] = useState([])

	function handleAdd(inputName, joining) {
		const nameValidate = checkName(inputName)
		if (nameValidate.length>=1){
			let test = checkValidity(joining, nameValidate[0].validityDate)
			console.log(test)
			if(!test){
				setErrorStatus(true)
				setErrorMessage(`Sorry ${userInputName}'s validity has Expired!`)
			}
			else{
				setResidenceList((prevValue) => [inputName, ...prevValue])
				setErrorStatus(false)
				setErrorMessage(null)
				
			}
		}
		else{
			setErrorStatus(true)
			setErrorMessage(`Sorry ${userInputName} is not a verified student!`)
		}
	}
	
	function checkName(name) {
		return STUDENTS.filter((item) => item.name.toLowerCase() == name.toLowerCase())
	}
	return (
		<>
			<div className="my-50 layout-row align-items-end justify-content-end">
				<label htmlFor="studentName">Student Name:
					<div>
						<input id="studentName" data-testid="studentName"
							type="text" className="mr-30 mt-10" 
							value={userInputName} 
							onChange={(e) => setUserInputName(e.target.value)}/>
					</div>
				</label>
				<label htmlFor="joiningDate">Joining Date:
					<div>
						<input id="joiningDate" 
						data-testid="joiningDate" 
						type="date" className="mr-30 mt-10"
						onChange={(e) => setJoiningDateInput(e.target.value)}
						/>
					</div>
				</label>
				<button
					type="button"
					data-testid="addBtn"
					className="small mb-0"
					onClick={() => handleAdd(userInputName,joiningDateInput)}
				>
					Add
				</button>
				
			</div>

			<div>
			{
				errorStatus && <Error errorMessage={errorMessage} />
			}
			</div>
      
			<ResidentsList residenceList={residenceList}/>
		</>
	);
}

export default Search;
