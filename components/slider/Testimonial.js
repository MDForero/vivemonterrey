"use client";
import { sliderProps } from "@/utility/sliderprops";
import Slider from "react-slick";

const Testimonial = () => {
  return (
    <Slider {...sliderProps.testimonials} className="testimonials-active">
  <div className="testimonial-item">
    <div className="testi-header">
      <div className="quote">
        <i className="flaticon-double-quotes" />
      </div>
      <h4>Una experiencia mágica</h4>
      <div className="ratting">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
      </div>
    </div>
    <div className="text">
      “Gracias a ViveMonterrey descubrimos lugares increíbles que no salen en los mapas. El equipo nos guió con recomendaciones locales, y los videos nos enamoraron antes de llegar.”
    </div>
    <div className="author">
      <div className="image">
        <img src="/assets/images/testimonials/turista1.jpg" alt="Turista" />
      </div>
      <div className="content">
        <h5>Valentina Rodríguez</h5>
        <span>Visitante de Bogotá</span>
      </div>
    </div>
  </div>

  <div className="testimonial-item">
    <div className="testi-header">
      <div className="quote">
        <i className="flaticon-double-quotes" />
      </div>
      <h4>Aliados que suman</h4>
      <div className="ratting">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
      </div>
    </div>
    <div className="text">
      “Desde que nos unimos a ViveMonterrey, hemos recibido más reservas y visibilidad. La grabación del video fue profesional, y la atención, excelente.”
    </div>
    <div className="author">
      <div className="image">
        <img src="/assets/images/testimonials/empresario1.jpg" alt="Aliado" />
      </div>
      <div className="content">
        <h5>Ruth Moreno</h5>
        <span>Dueña de Restaurante Crema y Sazón</span>
      </div>
    </div>
  </div>

  <div className="testimonial-item">
    <div className="testi-header">
      <div className="quote">
        <i className="flaticon-double-quotes" />
      </div>
      <h4>Monterrey como nunca lo había visto</h4>
      <div className="ratting">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
      </div>
    </div>
    <div className="text">
      “El video que vi en redes fue lo que me motivó a conocer el piedemonte. Cuando llegué, todo era aún más hermoso. Gracias por mostrar lo mejor de Casanare.”
    </div>
    <div className="author">
      <div className="image">
        <img src="/assets/images/testimonials/turista2.jpg" alt="Turista" />
      </div>
      <div className="content">
        <h5>Daniel Herrera</h5>
        <span>Turista de Medellín</span>
      </div>
    </div>
  </div>
</Slider>

  );
};
export default Testimonial;
