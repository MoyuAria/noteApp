import { useEffect, useState, useContext, useCallback, useMemo } from 'react'
import NotesAPI, { Note } from "../../api"
import StoreContext from '../../createContext'
import './Note.css'

function NoteDetail() {

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('编辑笔记...')

    const { preview, activeNote, _refreshNotes } = useContext(StoreContext);
    //console.log('preview', preview)

    const onNoteAdd = useCallback(() => {
        // 添加
        const newNote = {
            title: title,
            body: content,
        };

        NotesAPI.saveNote(newNote as Note);
        _refreshNotes();
    }, [title, content]);

    const onNoteSave = useCallback(() => {
        activeNote!.id ? onNoteEdit() : onNoteAdd();
    }, [activeNote, title, content])

    const onNoteEdit = useCallback(() => {
        // 编辑
        NotesAPI.saveNote({
            id: activeNote!.id,
            title,
            body: content,
        } as Note);
        _refreshNotes();
    }, [activeNote, title, content]);

    const onNoteDelete = useCallback(() => {
        // 删除
        const doDelete = confirm("确认要删除该笔记吗?");

        if (doDelete) {
            NotesAPI.deleteNote(activeNote?.id);
        }
        _refreshNotes();
    }, [activeNote]);

    const handleChangeTitle = useCallback((event: any) => {
        // 受控input组件
        setTitle(event!.target!.value as string);
    }, [])

    const handleChangeContent = useCallback((event: any) => {
        // 受控textarea组件
        setContent(event!.target!.value as string);
    }, [])

    useEffect(() => {
        // watch activeNote
        if (activeNote) {
            setTitle(activeNote.title);
            setContent(activeNote.body);
        }
    }, [activeNote]);

    return useMemo(() => (
        <div className="note__box" style={{ 'visibility': preview ? 'visible' : 'hidden' }}>
            <div className="notes__preview">
                <input value={title} onChange={handleChangeTitle} className="notes__title" type="text" placeholder="笔记标题..." />
                <textarea value={content} onChange={handleChangeContent} className="notes__body"  placeholder="开始记录..."></textarea>
            </div>
            <div className="notes__btns">
                <button className={ activeNote?.id ? 'btn__del' : 'btn__del btn__hide' } onClick={() => onNoteDelete()}>删除</button>
                <button className="btn__save" onClick={onNoteSave}>保存</button>
            </div>
        </div >
    ), [preview, title, content, activeNote])
}

export default NoteDetail