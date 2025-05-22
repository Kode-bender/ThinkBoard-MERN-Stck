import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async (id) => {
        if(!window.confirm("Confirm Delete")) return

        try {
            await api.delete(`/notes/${id}`)
            toast.success("Note deleted successfully")
            navigate("/")
        } catch (error) {
            console.error("Error deleting note", error)
            toast.error("Failed to delete note")
        }
    }
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("All fileds require!!!")
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note update success")
      navigate("/")
    } catch (error) {
      console.error("Error updating note", error)
      toast.error("Failed to update note")
    } finally {
      setSaving(false)
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note details", error);
        toast.error("Error fetchindg note details");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            <button
              onClick={() => handleDelete(note._id)}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete note
            </button>
          </div>
          
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 items-center">Update Note Details</h2>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
