import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { register, clearError } from "../store/slices/authSlice";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isAuthenticated) {
      navigate("/login");
    }
  }, [user, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Local validation
    if (password.length < 5) {
      setValidationError("La contraseña debe tener al menos 5 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Las contraseñas no coinciden");
      return;
    }

    try {
      await dispatch(register({ username, password })).unwrap();
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-8"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Bienvenido</h2>
          <p className="text-slate-500 font-medium">
            Ingresa tus datos para crear una cuenta
          </p>
        </div>

        {(error || validationError) && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
            {validationError || error}
          </div>
        )}

        <div className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-slate-700"
            >
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Tu nombre de usuario"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) dispatch(clearError());
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-900"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) dispatch(clearError());
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-900"
              required
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-slate-700"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) dispatch(clearError());
            }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-slate-900"
            required
          />
        </div>

        <Button
          className="w-full py-4 text-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </Button>

        <p className="text-center text-sm text-slate-500">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            className="text-slate-900 font-bold hover:underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
