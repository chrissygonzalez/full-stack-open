import personService from './services/persons';

const PhoneNumbers = ({ peopleToShow, deletePerson }) => {
    return (
        <>
            <h2>Numbers</h2>
            {peopleToShow.map(person =>
                <p key={person.name}>{person.name} {person.number} {' '}
                    <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
                </p>)}
        </>
    )
}

export default PhoneNumbers;