const PersonForm = ({ handleNameChange, handleNumberChange, handleSubmit, newName, newNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        number: <input value={newNumber} onChange={handleNumberChange} />
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;