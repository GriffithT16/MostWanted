/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */

 function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}


function displayPeopleParents(people) {
    alert(
        people
            .map(function (person) {
                return ` Parent: ${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}

function displayDescendants(people) {
    alert(
        people
            .map(function (person) {
                return `Descendant: ${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`; 
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonFamily(person, people){
    let spouseId = person.currentSpouse
    let spouseName;
    spouseName = people.filter(function(el){
        if(el.id === spouseId){
            return true
        }
        

    })


    let parentsId = person.parents
    let parentsName;
    parentsName = people.filter(function(el){
        if (parentsId.includes(el.id)){
            return true;
        }
    })


    let personFamily;

    if (spouseId === null){
        personFamily = `Spouse: Single\n`;
    }
    else{
        personFamily = `Spouse: ${spouseName[0].firstName + " " + spouseName[0].lastName}\n`;

    }
    if (parentsId == []){
        personFamily += 'No Parents on Record'
    }
    else{
        displayPeopleParents(parentsName)
    }

    
    
       
 
        alert(personFamily);
    }
    
function findPersonDescendants(person, people){
       
    let parent = person.id
    let descendants
    descendants = people.filter(function(el){
        if (el.parents.includes(parent)){
            return true;
        }
    })
    // // let personDescendants
    // // if (descendants = []){
    // //     personDescendants = "No Children"
    // // }
    // // else{
    //     displayDescendants(descendants);
    // }
    displayDescendants(descendants)
    // alert(personDescendants)
}   

function searchByTraits(people){
    let searchResults = people;
    let questionAnswered = true
    while (questionAnswered == true){

        let searchType = promptFor('Please Enter one of the following options:\ngender\nDOB\nheight\nweight\neyecolor\noccupation\nYou can also enter either (quit) or (restart).', chars)
        switch (searchType) {
            case "gender":
                searchResults = searchByGender(searchResults);
                let userInput = prompt("Would you like to search by more criteria?")
                if (userInput === "yes"){
                    break
                }
                else if(userInput === "no"){
                    questionAnswered = true
                    return;
                }else{
                    alert ('Invalid Input, returning to filter options.')
                    break;
                }
            case "DOB":
                searchResults = searchByDOB(searchResults);
                let userInput1 = prompt("Would you like to search by more criteria?")
                if (userInput1 === "yes"){
                    break
                }
                else if(userInput1 === "no"){
                    questionAnswered = true
                    return;
                }else{
                    alert ('Invalid Input, returning to filter options.')
                    break;
                }
            case "height":
                searchResults = searchByHeight(searchResults);
                let userInput2 = prompt("Would you like to search by more criteria?")
                if (userInput2 === "yes"){
                    break
                }
                else if(userInput2 === "no"){
                    questionAnswered = false
                    return;
                }else{
                    alert ('Invalid Input, returning to filter options.')
                    break;
                }
            case "weight":
                searchResults = searchByWeight(searchResults);
                let userInput3 = prompt("Would you like to search by more criteria?")
                if (userInput3 === "yes"){
                    break
                }
                else if(userInput3 === "no"){
                    questionAnswered = true
                    return;
                }else{
                    alert ('Invalid Input, returning to filter options.')
                    break;
                }
            case "eyecolor":
                searchResults = searchByEyeColor(searchResults);
                let userInput4 = prompt("Would you like to search by more criteria?")
                if (userInput4 === "yes"){
                    break
                }
                else if(userInput4 === "no"){
                    questionAnswered = true
                    return;
                }else{
                    alert ('Invalid Input, returning to filter options.')
                    break;
                }
            case "occupation":
                searchResults = searchByOccupation(searchResults);
                let userInput5 = prompt("Would you like to search by more criteria?")
                if (userInput5 === "yes"){
                    break
                }
                else if(userInput5 === "no"){
                    questionAnswered = true
                    return;
                }else{
                    alert ('Invalid Input, returning to filter options.')
                    break;
                }
            case "restart":
                app(searchResults);
                break;
            case "quit":
                return;
            default:
                app(people);
                break;
        }
    }
}

function searchByGender(people){
    let userInput;
    let males;
    let females;
    let genderInput = true;
    while (genderInput == true){
        userInput = prompt("enter male or female")
        if (userInput == "male"){
            males = people.filter(function(el){
                if (el.gender === "male")
                return true
            })
            displayPeople(males)
            return males
    
        }
        else if(userInput =="female"){
            females = people.filter(function(el){
                if (el.gender === "female")
                return true
            })
            displayPeople(females)
            return females
        }
        else{
            alert("Please enter male or female")
        }
    }
}

function searchByDOB(people){
    let DOBInput = true
    let userInput;
    while (DOBInput == true){
        userInput = prompt('Enter DOB : m/d/yyyy')
        let DOB;
        DOB = people.filter(function(el){
            if (el.dob === userInput)
            return true;
        })
        if (DOB.length === 0){
            alert("No DOB matches in the database")
        }
        else{
            displayPeople(DOB)
            return DOB
        }    
    }
}

function searchByHeight(people){
    let heightInput = true
    let userInput;
    while (heightInput == true){
        userInput = parseInt(prompt('Enter Height : inches ex.(65)'))
        if (isNaN(userInput)){
            alert ('Please enter a number.')
        }else{
            heightInput = false
            break;
        }}
    let Height;
    Height = people.filter(function(el){
        if (el.height === userInput)
        return true;
    })
    displayPeople(Height)
    return Height
}

function searchByWeight(people){
    let weightInput = true
    let userInput;
    while (weightInput == true){
        userInput = parseInt(prompt('Enter Weight : lbs ex.(199)'))
        if (isNaN(userInput)){
            alert ('Please enter a number.')
        }else{
            weightInput = false
            break;
        }
    }    
    let Weight;
    Weight = people.filter(function(el){
        if (el.weight === userInput)
        return true;
    })
    displayPeople(Weight)
    return Weight
}

function searchByEyeColor(people){
    let eyeColorInput = true
    let userInput;
    while (eyeColorInput == true){
        userInput = prompt('Enter Eye Color')
        let eyeColor;
        eyeColor = people.filter(function(el){
            if (el.eyeColor === userInput)
            return true;
        })
        if (eyeColor.length === 0){
            alert("No eye color matches in the database")
        }
        else{
            displayPeople(eyeColor)
            return eyeColor
        }
    }
}

function searchByOccupation(people){
    let occupationInput = true
    let userInput;
    while (occupationInput == true){
        userInput = prompt('Enter Occupation')
        let Occupation;
        Occupation = people.filter(function(el){
            if (el.occupation === userInput)
            return true;
        })
        if (Occupation.length === 0){
            alert("No occupation matches in database")
        }
        else{
            displayPeople(Occupation)
            return Occupation
        }
    }
}


