import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../paginas/Navbar';
import Footer from '../paginas/Footer';

function Layout({ children }) {
 
    // SEO NATIVO con useEffect
  useEffect(() => {
    document.title = "Librerio Macondo | Novelas, Históricos, Sci-fi, Clásicos y Contemporaneos";
   
    // Función que actualiza meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos
    updateMetaTag('description', 'Libreria Macondo. Explora el listado de libros mas completo.');
    updateMetaTag('keywords', 'Novela, Novela Histórica, Ciencia Ficción, Libros clásicos, Autores Clásicos, Autor Premio Nobel');
    updateMetaTag('author', '@fjmaisonnave');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'Libreria Macondo', 'property');
    updateMetaTag('og:description', 'Explora el listado de libros mas completo.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Libreria Macondo');
    updateMetaTag('twitter:description', 'Todos los los iniversos del mundo en un solo sitio');
    updateMetaTag('twitter:image', window.location.origin + '/logo.jpg');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin;

  }, []);

  return (
    <LayoutContainer>
      <Header role="banner">
        <Navbar />
      </Header>
      
      <Main role="main">
        {children}
      </Main>
      
      <FooterWrapper role="contentinfo">
        <Footer />
      </FooterWrapper>
    </LayoutContainer>
  );
}

export default Layout;

// Styled Components
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  background-color: transparent;
  z-index: 100;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: 0;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  margin-top: auto;
`;
