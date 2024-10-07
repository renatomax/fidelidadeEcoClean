"use server";
import dataConectClientes from "@/database/connectCliente";
import { clienteTipo } from "@/types/clienteTipo";
import { compraTipo } from "@/types/compraType";

export async function adicionandoCliente({
  nomeCliente,
  compras,
}: {
  nomeCliente: string;
  compras: compraTipo[];
}) {
  const connCliente = await dataConectClientes();
  const modelClienteFidelidade = connCliente.model("cliente");
  const gerandoCliente = new modelClienteFidelidade({ nomeCliente, compras });
  await gerandoCliente.save().then(() => {
    console.log("Cliente salvo com sucesso.");
  });
  const clienteEncontrado = await modelClienteFidelidade
    .findOne({
      nomeCliente: nomeCliente,
    })
    .lean(); // Use lean() to get a plain JavaScript object

  // Convert to plain object
  const plainCliente = JSON.parse(JSON.stringify(clienteEncontrado));
  return plainCliente;
}
