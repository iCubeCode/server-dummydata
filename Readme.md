

# icube code - Server - dummy user data

1. users
2. employees
3. images



<!-- Examples for MONGO DB CRUD -->

<!-- Create -->
const createNote = async () => {
  const note = new Notes({
    name: 'John Doe',
    note: 'This is a note.',
  });

  try {
    const savedNote = await note.save();
    console.log('Note Created:', savedNote);
  } catch (err) {
    console.error('Error creating note:', err);
  }
};

createNote();




<!-- GET BY ID -->
const readNoteById = async (_id) => {
  try {
    const note = await Notes.findById(_id);
    if (note) {
      console.log('Note Found:', note);
    } else {
      console.log('Note not found.');
    }
  } catch (err) {
    console.error('Error reading note:', err);
  }
};

// Example usage
const exampleId = '60c72b2f9b1e8b001f1dce97'; // Replace with an actual _id from your database
readNoteById(exampleId);




<!-- Update -->
const updateNoteById = async (_id, updatedData) => {
  try {
    const updatedNote = await Notes.findByIdAndUpdate(
      _id,
      updatedData,
      { new: true } // This option returns the updated document
    );
    if (updatedNote) {
      console.log('Updated Note:', updatedNote);
    } else {
      console.log('Note not found.');
    }
  } catch (err) {
    console.error('Error updating note:', err);
  }
};

// Example usage
const exampleId = '60c72b2f9b1e8b001f1dce97'; // Replace with an actual _id from your database
const updatedData = { name: 'Jane Doe', note: 'This is an updated note.' };
updateNoteById(exampleId, updatedData);




<!-- Delete -->
const deleteNoteById = async (_id) => {
  try {
    const deletedNote = await Notes.findByIdAndDelete(_id);
    if (deletedNote) {
      console.log('Deleted Note:', deletedNote);
    } else {
      console.log('Note not found.');
    }
  } catch (err) {
    console.error('Error deleting note:', err);
  }
};

// Example usage
const exampleId = '60c72b2f9b1e8b001f1dce97'; // Replace with an actual _id from your database
deleteNoteById(exampleId);



<!-- Only Id and name -->

const getAllNotesNames = async () => {
  try {
    const notes = await Notes.find().select('_id name');  // Select only _id and name fields
    console.log('Notes (Only _id and name):', notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
};

// Call the function
getAllNotesNames();
