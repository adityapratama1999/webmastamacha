import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stokBahan }) {
    const stockBahan = stokBahan;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-emerald-800 leading-tight">Dashboard Stock Masta Macha</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-emerald-500 overflow-hidden shadow-sm sm:rounded-lg">
                        {/*Table Monitoring*/}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-emerald-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Nama Bahan</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Minimum Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {stokBahan && stokBahan.length > 0 ? (
                                        stokBahan.map((bahan) => (
                                            <tr key={bahan.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bahan.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{bahan.stock} {bahan.unit}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bahan.minim_stock}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${bahan.status === 'Kritis'?'bg-red-100 text-red-800':bahan.status === 'Warning/Harap Melakukan Pembelian Bahan Baku'?'bg-yellow-100 text-yellow-800':'bg-emerald-100 text-emerald-800'}`}>
                                                        {bahan.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 text-center">
                                                No stock data available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
