// MongoDB CRUD exercise
// Run with: mongosh mongodb_contact_crud.js

use('contact');

const contacts = db.getCollection('contactlist');

// Create and populate the collection.
const inserted = contacts.insertMany([
  { lastName: 'Ben', firstName: 'Moris', email: 'ben@gmail.com', age: 26 },
  { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
  { lastName: 'Emilie', firstName: 'brouge', email: 'emilie.b@gmail.com', age: 40 },
  { lastName: 'Alex', firstName: 'brown', age: 4 },
  { lastName: 'Denzel', firstName: 'Washington', age: 3 }
]);

print('\n1) All contacts:');
contacts.find().forEach(printjson);

// Find one contact by its MongoDB _id.
const personId = inserted.insertedIds[0];
print('\n2) Contact with ID ' + personId + ':');
printjson(contacts.findOne({ _id: personId }));

print('\n3) Contacts older than 18:');
contacts.find({ age: { $gt: 18 } }).forEach(printjson);

print('\n4) Contacts older than 18 whose first or last name contains "ah":');
contacts.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: 'ah', $options: 'i' } },
    { lastName: { $regex: 'ah', $options: 'i' } }
  ]
}).forEach(printjson);

// Change Kefi Seif's first name to Anis.
const updateResult = contacts.updateOne(
  { lastName: 'Kefi', firstName: 'Seif' },
  { $set: { firstName: 'Anis' } }
);
print('\n5) Updated Kefi Seif to Kefi Anis (' + updateResult.modifiedCount + ' document(s) modified).');

// Delete contacts younger than 5.
const deleteResult = contacts.deleteMany({ age: { $lt: 5 } });
print('\n6) Deleted contacts younger than 5 (' + deleteResult.deletedCount + ' document(s) deleted).');

print('\n7) Final contacts list:');
contacts.find().forEach(printjson);
