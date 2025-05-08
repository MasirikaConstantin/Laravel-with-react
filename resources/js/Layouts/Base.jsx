import Footer from "@/Components/Footer";
import Header from "@/Components/Header"
import { Head } from "@inertiajs/react";

export default function BaseLayout({ children }) {
    return (
        <>
            <Head title="Accueil" />

        <Header/>
        
  
        <main className="p-6">{children}</main>
  
        <Footer/>
      </>
    );
  }
  