import Layout from "@/components/layouts/layout";
import { useSession } from "next-auth/react";
import {
  FormEvent,
  useState,
} from "react";

const Config = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    address: session?.user?.direccion || "",
    phone: session?.user?.celular || "",
    paymentMethod: session?.user?.metodoPago || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    // Optionally show a success message or reload session
  };

  return (
    <Layout>
      <div className="flex justify-items-center h-">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 bg-gray-800 rounded-2xl shadow"
        >
          <label>
            Nombre de usuario
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="block w-full focus:border-b mb-2 rounded border border-gray-500 focus:cursor-text"
            />
          </label>
          <label>
            Dirección
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="block w-full focus:border-b mb-2 rounded border border-gray-500 focus:cursor-text"
            />
          </label>
          <label>
            Teléfono
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="block w-full focus:border-b mb-2 rounded border border-gray-500 focus:cursor-text"
            />
          </label>
          <button
            type="submit"
            className="bg-[#EF4343] text-white mt-4 px-4 py-2 rounded font-semibold"
          >
            Guardar
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Config;
