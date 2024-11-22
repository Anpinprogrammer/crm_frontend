import { useEffect } from "react"
import TablaClientes from "../components/TablaClientes"


const AdministrarClientes = () => {

  return (
    <>
        <h2
            className="text-3xl font-light text-center"
        >Clientes
            <div className="flex flex-col mt-10">
                <div className="py-2 overflow-x-auto">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                        <TablaClientes />
                    </div>
                </div>
            </div>
        </h2>
    </>
  )
}

export default AdministrarClientes