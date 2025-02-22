"use client";

import { useActionState, useState } from "react";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signout } from "@/lib/auth";
import SubmitButton from "@/components/ui/custom-submit-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBusiness } from "@/lib/business";

export function CreateBusinessForm() {
  const [state, action] = useActionState(createBusiness, undefined);

  const [name, setName] = useState("");
  const [cif, setCif] = useState("");
  // const [residenceType, setResidenceType] = useState("");

  if (state?.ok) {
    redirect("/login");
  }

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const result = await signout();
    if (result.ok) {
      redirect("/");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Crea tu negocio</CardTitle>
          <CardDescription>
            ¡Estás a un paso! Configura tu negocio y comienza a gestionar tus
            facturas hoy mismo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              {state?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Denominación</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nombre de Negocio"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {state?.error?.name && (
                  <p className="text-xs text-red-700">{state.error.name}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cif">Código de Identificación Fiscal</Label>
                <Input
                  id="cif"
                  name="cif"
                  type="cif"
                  placeholder="B99999999"
                  required
                  value={cif}
                  onChange={(e) => setCif(e.target.value)}
                />
                {state?.error?.cif && (
                  <p className="text-xs text-red-700">{state.error.cif}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cif">Tipo de Residencia</Label>
                <Select name="residenceType">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="E">Extranjero</SelectItem>
                      <SelectItem value="R">Residente (en España)</SelectItem>
                      <SelectItem value="U">
                        Residente en la Unión Europea (excepto España)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {state?.error?.residenceType && (
                  <div className="text-xs text-red-700">
                    <p>Tipo de Residencia:</p>
                    <ul>
                      {state.error.residenceType.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <SubmitButton>Enviar</SubmitButton>
            </div>
            <div className="mt-4 text-center text-sm">
              O si lo prefieres puedes{" "}
              <a
                href="/logout"
                className="underline underline-offset-4"
                onClick={handleLogout}
              >
                Salir
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
