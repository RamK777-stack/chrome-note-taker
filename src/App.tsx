import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Edit2 } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  timestamp: number
}

export default function NoteApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  useEffect(() => {
    const storedNotes = localStorage.getItem("chromeExtensionNotes")
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("chromeExtensionNotes", JSON.stringify(notes))
  }, [notes])

  const addOrUpdateNote = () => {
    if (title.trim() && content.trim()) {
      if (editingNoteId) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === editingNoteId
              ? { ...note, title: title.trim(), content: content.trim(), timestamp: Date.now() }
              : note
          )
        )
        setEditingNoteId(null)
      } else {
        const newNote: Note = {
          id: Date.now().toString(),
          title: title.trim(),
          content: content.trim(),
          timestamp: Date.now(),
        }
        setNotes((prevNotes) => [newNote, ...prevNotes])
      }
      setTitle("")
      setContent("")
    }
  }

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
    if (editingNoteId === id) {
      setEditingNoteId(null)
      setTitle("")
      setContent("")
    }
  }

  const editNote = (note: Note) => {
    setEditingNoteId(note.id)
    setTitle(note.title)
    setContent(note.content)
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Note Taker</h1>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
          aria-label="Note title input"
        />
        <Textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[100px]"
          aria-label="Note content input"
        />
        <Button onClick={addOrUpdateNote} className="w-full">
          {editingNoteId ? "Update Note" : "Add Note"}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-300px)] mt-4">
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-100 p-3 rounded-lg relative">
              <h3 className="font-semibold pr-12">{note.title}</h3>
              <p className="text-sm mt-1">{note.content}</p>
              <span className="text-xs text-gray-500 block mt-2">
                {new Date(note.timestamp).toLocaleString()}
              </span>
              <button
                onClick={() => editNote(note)}
                className="absolute top-2 right-8 text-blue-500 hover:text-blue-700"
                aria-label={`Edit note: ${note.title}`}
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                aria-label={`Delete note: ${note.title}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}