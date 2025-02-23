"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AlertCircle, Check, ChevronDown, CircleX } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
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
import { getCountries } from "@/lib/country";
import { Country } from "@/types/country.type";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/session";
import Image from "next/image";

export function CreateBusinessForm() {
  const [state, action] = useActionState(createBusiness, undefined);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [countries, setCountries] = useState<Country[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [logo, setLogo] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [cif, setCif] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("");
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const result = await getCountries();
      if (result.ok) {
        setCountries(result.data);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (state?.ok) {
      //updateUser({ hasBusiness: true }).then(() => router.refresh());
    }
  }, [state, router]);

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const result = await signout();
    if (result.ok) {
      redirect("/");
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Restablece el valor del input file
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
            {/* <div className="flex flex-col gap-6"> */}
            <div className={cn("grid gap-6 sm:grid-cols-1 xl:grid-cols-2")}>
              {state?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2 col-span-full">
                <div>
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    id="logo"
                    name="logo"
                    type="file"
                    required
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                  />
                  {logo && (
                    <div className="my-8 relative flex items-center justify-center">
                      <Image
                        src={logo}
                        alt="Preview"
                        width={200}
                        height={200}
                      />
                      <button
                        onClick={handleRemoveLogo}
                        className="absolute top-0 right-0 text-red-500 py-1 px-2"
                        aria-label="Remove image"
                      >
                        <CircleX />
                      </button>
                    </div>
                  )}
                  {state?.error?.logo && (
                    <p className="text-xs text-red-700">{state.error.logo}</p>
                  )}
                </div>
              </div>
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
                <Label htmlFor="taxIdentification">
                  Código de Identificación Fiscal
                </Label>
                <Input
                  id="taxIdentification"
                  name="taxIdentification"
                  type="text"
                  placeholder="B12345678"
                  required
                  value={cif}
                  onChange={(e) => setCif(e.target.value)}
                />
                {state?.error?.taxIdentification && (
                  <p className="text-xs text-red-700">
                    {state.error.taxIdentification}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="residenceType">Tipo de Residencia</Label>
                <Select name="residenceType">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="E">Extranjero</SelectItem>
                      <SelectItem value="R">Residente (en España)</SelectItem>
                      <SelectItem value="U">
                        Residente en la UE (no España)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {state?.error?.residenceType && (
                  <p className="text-xs text-red-700">
                    {state.error.residenceType}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="street">Calle</Label>
                <Input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="Calle Pablo Almodóvar 23"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                {state?.error?.street && (
                  <p className="text-xs text-red-700">{state.error.street}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postalCode">Código Postal</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="12345"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                {state?.error?.postalCode && (
                  <p className="text-xs text-red-700">
                    {state.error.postalCode}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="town">Municipio</Label>
                <Input
                  id="town"
                  name="town"
                  type="text"
                  placeholder="Madrid"
                  required
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                />
                {state?.error?.town && (
                  <p className="text-xs text-red-700">{state.error.town}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="province">Provincia</Label>
                <Input
                  id="province"
                  name="province"
                  type="text"
                  placeholder="Madrid"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
                {state?.error?.province && (
                  <p className="text-xs text-red-700">{state.error.province}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="countryId">País</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between font-normal px-3"
                    >
                      {value
                        ? countries.find((item) => item.name === value)?.name
                        : "Selecciona el país..."}
                      <ChevronDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Buscar país..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No se econtraron países.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.name}
                              onSelect={(currentValue: string) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setCountryId(item.id);
                                setOpen(false);
                              }}
                            >
                              {item.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === item.name
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <input type="hidden" name="countryId" value={countryId} />
                {state?.error?.countryId && (
                  <p className="text-xs text-red-700">
                    {state.error.countryId}
                  </p>
                )}
              </div>
              <div className="col-span-full">
                <SubmitButton>Enviar</SubmitButton>
              </div>
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
