import AppLayout from '@/Layouts/Base';
import { SearchModal } from '@/Components/SearchModal';

export default function SearchShow({ results, query }) {
    return (
        <AppLayout
            results={results}
            query={query}
        >
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Résultats pour "{query}"</h1>
                {/* Affichez ici les résultats de manière plus détaillée */}
            </div>
        </AppLayout>
    );
}