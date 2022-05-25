import { useCallback, useEffect, useState } from 'react'
import NoteDetail from '../components/note/NoteDetail'
import NotesAPI, { Note } from "../api"
import StoreContext from '../createContext'

const MAX_BODY_LENGTH = 60;

function Home() {

  const [preview, setPreview] = useState<boolean>(true)
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)

  const _setNotes = useCallback((notes: Note[]) => {
    setNotes(notes);
    setPreview(notes.length > 0);
  }, [])

  const _setActiveNote = useCallback((note: Note) => {
    // 更新 active note
    setActiveNote(note);
  }, [])

  const _refreshNotes = useCallback(() => {
    //console.log('_refreshNotes')
    // 初始化列表，读取本地缓存
    const notes = NotesAPI.getAllNotes();

    _setNotes(notes);

    if (notes.length > 0) {
      _setActiveNote(notes[0]);
    }
  }, [])

  const onNoteSelect = useCallback((noteId: number) => {
    // 选择
    const notes = NotesAPI.getAllNotes();
    const selectedNote = notes.find((note) => note.id === noteId);
    if (selectedNote) {
      _setActiveNote(selectedNote);
    }
  }, [])
  
  const onNoteAdd = useCallback(() => {
    // 添加
    const newNote = {
      title: '',
      body: '',
    };

    _setActiveNote(newNote as Note);

    //NotesAPI.saveNote(newNote as Note);
    //_refreshNotes();
  }, [])

  const onNoteDelete = useCallback((noteId: number) => {
    // 删除
    const doDelete = confirm("确认要删除该笔记吗?");

    if (doDelete) {
      NotesAPI.deleteNote(noteId);
      _refreshNotes();
    }
  }, [])

  useEffect(() => {
    // didmounted
    _refreshNotes();
  }, []);

  return (
    <div className="notes__wrap">
      <div className="notes__sidebar">
        <button className="notes__add" type="button" onClick={onNoteAdd}>添加新的笔记 📒</button>
        <div className="notes__list">
          {
            notes.map(({ title, id, body, updated }: Note) => (
              <div key={id} className={`notes__list-item ${activeNote?.id === id ? 'notes__list-item--selected' : ''}`} data-note-id={id} onClick={() => onNoteSelect(id)} onDoubleClick={() => onNoteDelete(id)} >
                <div className="notes__small-title">{title}</div>
                <div className="notes__small-body">
                  {body.substring(0, MAX_BODY_LENGTH)}
                  {body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div className="notes__small-updated">
                  {new Date(updated).toLocaleString(undefined, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <StoreContext.Provider value={{ preview, activeNote, _refreshNotes }}>
        <NoteDetail />
      </StoreContext.Provider>
    </div >
  )
}

export default Home