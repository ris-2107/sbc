import mongoose from "mongoose";


const schema = new mongoose.Schema({
    note_creator: { type: "String" },
    emailsAllowed: {
        type: Array,
        items: {
            type: String
        }
    },
    note_title: { type: "String" },
    note_description: { type: "String" },
    note_creator_id: { type: "String" },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const GlobalNote = mongoose.model("GlobalNote", schema);
