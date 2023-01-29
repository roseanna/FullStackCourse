const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
const password = encodeURIComponent(process.argv[2])
const personName = encodeURIComponent(process.argv[3])
const personPhone = encodeURIComponent(process.argv[4])

const url = `mongodb+srv://roseanna:${password}@cluster0.gtsqmda.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    content: String,
    name: String,
    phone: String
})
const Contact = new mongoose.model('Contact', contactSchema)

console.log(personName, personName.length, personPhone, personPhone.length)
if (personName != 'undefined' && personPhone != 'undefined') {
    const contact = new Contact({
    "name": personName,
    "phone": personPhone
    })
    contact.save().then(result => {
        console.log(`added ${personName} number ${personPhone} to phonebook`)
    })
}
else {
    Contact.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
