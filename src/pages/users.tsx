import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/layouts/layout";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  direccion?: string;
  celular?: string;
  rol?: string;
}

const roleOptions = ["ADMIN", "USER"];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [, setLoading] = useState(true);
  const [editingRole, setEditingRole] = useState<{ [id: string]: string }>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    image: "",
    direccion: "",
    celular: "",
    rol: "USER",
  });
  const [addError, setAddError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user/all")
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            router.replace("/");
            return null;
          }
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUsers(data);
        setLoading(false);
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  const handleRoleChange = (id: string, newRole: string) => {
    setEditingRole((prev) => ({ ...prev, [id]: newRole }));
  };

  const saveRole = async (id: string) => {
    const newRole = editingRole[id];
    await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, rol: newRole }),
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, rol: newRole } : u))
    );
    setEditingRole((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    await fetch(`/api/user/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleAddUser = () => {
    setShowAddModal(true);
    setAddError(null);
    setNewUser({
      name: "",
      email: "",
      image: "",
      direccion: "",
      celular: "",
      rol: "USER",
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    const res = await fetch("/api/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (res.ok) {
      const created = await res.json();
      setUsers((prev) => [...prev, created]);
      setShowAddModal(false);
    } else {
      const err = await res.json();
      setAddError(err.error || "Error al crear usuario");
    }
  };

  return (
    <Layout sideBarOpen={false}>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3 mb-4 justify-between">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Usuarios registrados
          </h2>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Añadir usuario
          </button>
        </div>
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={handleAddSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h3 className="text-lg font-bold mb-4">Nuevo usuario</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Correo</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Imagen (URL)
                </label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={newUser.image}
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, image: e.target.value }))
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Celular</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={newUser.celular}
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, celular: e.target.value }))
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Dirección</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={newUser.direccion}
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, direccion: e.target.value }))
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Rol</label>
                <select
                  className="w-full border rounded px-2 py-1 cursor-pointer"
                  value={newUser.rol}
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, rol: e.target.value }))
                  }
                  required
                >
                  {roleOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-black">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {addError && <div className="text-red-500 mb-2">{addError}</div>}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Nombre
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Imagen
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Correo
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Celular
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Dirección
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Rol
                      </th>
                      <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-4 text-sm font-medium text-white whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-white whitespace-nowrap">
                          {user.image ? (
                            <Image
                              className="object-cover w-10 h-10 rounded-full"
                              src={user.image}
                              alt={user.name}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                              ?
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {user.celular || "-"}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {user.direccion || "-"}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {editingRole[user.id] !== undefined ? (
                            <span>
                              <select
                                value={editingRole[user.id]}
                                onChange={(e) =>
                                  handleRoleChange(user.id, e.target.value)
                                }
                                className="border rounded px-2 py-1"
                              >
                                {roleOptions.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                                onClick={() => saveRole(user.id)}
                              >
                                Guardar
                              </button>
                              <button
                                className="ml-2 px-2 py-1 bg-gray-400 text-white rounded"
                                onClick={() =>
                                  setEditingRole((prev) => {
                                    const copy = { ...prev };
                                    delete copy[user.id];
                                    return copy;
                                  })
                                }
                              >
                                Cancelar
                              </button>
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              {user.rol}
                              <button
                                className="text-red-500 hover:text-red-700 mr-2 cursor-pointer"
                                onClick={() =>
                                  setEditingRole((prev) => ({
                                    ...prev,
                                    [user.id]: user.rol || "USER",
                                  }))
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="#EF4343"
                                >
                                  <path
                                    d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6.525q.5 0 .75.313t.25.687t-.262.688T11.5 5H5v14h14v-6.525q0-.5.313-.75t.687-.25t.688.25t.312.75V19q0 .825-.587 1.413T19 21zm4-7v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662l-8.6 8.6q-.275.275-.637.438t-.763.162H10q-.425 0-.712-.288T9 14m12.025-9.6l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
                                  />
                                </svg>
                              </button>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700 mr-2 cursor-pointer"
                            onClick={() => handleDelete(user.id)}
                            title="Eliminar usuario"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UsersPage;
