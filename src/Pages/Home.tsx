import { toast } from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { RestaurantContext } from '../Contexts/restaurantContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/currentUser';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const navigate = useNavigate();
  const restaurantContext = useContext(RestaurantContext);
  const isRestaurantOpen = restaurantContext?.isRestaurantOpen;
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  AOS.init();

  useEffect(() => {
    if (isRestaurantOpen === null) {
      return;
    }
    try {
      if (!isRestaurantOpen)
        toast(
          'Restaurante está fechado, só é possível fazer pedidos por agendamento para buscar na loja',
          {
            duration: 8000,
            position: 'bottom-center',
          }
        );
    } catch (err) {
      console.log(err);
    }
  }, [isRestaurantOpen, user]);

  return (
    <>
      <div
        data-aos="zoom-in-down"
        data-aos-duration="2000"
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: '85vh',
        }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://www.sabornamesa.com.br/media/k2/items/cache/b7e870fe16253b03d4f5e4eca7c887cf_XL.jpg')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-gray-700"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">
                  Casa Santê para você
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Descubra uma experiência gastronômica única no coração da
                  cidade (Santa tereza)! Na Casa Santê, unimos a tradição de
                  sabores autênticos com a conveniência de um extenso menu que
                  agrada a todos os paladares. Para tornar sua experiência ainda
                  mais conveniente, oferecemos entrega gratuita em um raio de
                  2km a partir do nosso restaurante. Aproveite o conforto de
                  sabores excepcionais entregues à sua porta!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: '70px' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-red-400 fill-current "
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <section className="pb-20 bg-red-400 -mt-24">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-wrap">
            <div
              data-aos="zoom-in-left"
              data-aos-duration="2000"
              className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center mt-6 "
              onClick={() => navigate('/menu')}
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:cursor-pointer">
                <div className="max-h-96">
                  <img
                    src="/açai.jpg"
                    alt="Restaurant Logo"
                    className="mx-auto rounded-xl max-h-full object-fill"
                  />
                </div>
                <div className="px-4 py-5 flex-auto">
                  <h6 className="text-xl font-semibold text-restaurant-primary">
                    Açais
                  </h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Deleite-se com nossos bowls de açaí premium, preparados com
                    frutas frescas e coberturas irresistíveis. Uma explosão de
                    sabor tropical em cada colher!
                  </p>
                </div>
              </div>
            </div>

            <div
              data-aos="zoom-in-down"
              data-aos-duration="2000"
              className="lg:pt-12 pt-5 w-full md:w-4/12 px-4 text-center "
              onClick={() => navigate('/menu')}
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:cursor-pointer">
                <div className="max-h-96">
                  <img
                    src="/massa.webp"
                    alt="Restaurant Logo"
                    className="mx-auto rounded-xl max-h-full object-fill"
                  />
                </div>
                <div className="px-4 py-5 flex-auto">
                  <h6 className="text-xl font-semibold text-restaurant-primary">
                    Massas
                  </h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Viaje pela Itália em cada garfada! Nossas massas artesanais
                    são preparadas com ingredientes de alta qualidade,
                    proporcionando uma experiência culinária que aquece o
                    coração.
                  </p>
                </div>
              </div>
            </div>

            <div
              data-aos="zoom-in-right"
              data-aos-duration="2000"
              className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center mt-6 "
              onClick={() => navigate('/menu')}
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:cursor-pointer">
                <div className="max-h-96">
                  <img
                    src="/hotdog.avif"
                    alt="Restaurant Logo"
                    className="mx-auto rounded-xl max-h-full object-fill"
                  />
                </div>
                <div className="px-4 py-5 flex-auto">
                  <h6 className="text-xl font-semibold text-restaurant-primary">
                    Hot dog
                  </h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Nossos hot dogs são uma obra-prima para os amantes de
                    sabores audaciosos. Escolha entre uma variedade de
                    combinações deliciosas, onde cada mordida é uma experiência
                    única.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-32">
            <div
              data-aos="flip-left"
              data-aos-duration="2000"
              className="w-full md:w-5/12 px-4 mr-auto ml-auto"
            >
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Quem Somos - Casa Santê Quem Somos -
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-900">
                Casa Santê Bem-vindos à Casa Santê, o lugar onde as tradições
                italianas se encontram com a ousadia dos sabores tropicais!
                Somos um casal apaixonado, enraizado em nossas origens
                italianas, mas que encontrou no Brasil a inspiração para criar
                uma experiência gastronômica única.
              </p>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-900">
                História de Amor e Sabor: Crescemos em meio ao aroma
                irresistível de massas frescas e receitas de família
                transmitidas de geração em geração. A Casa Santê é a
                materialização do nosso amor pela culinária, uma fusão de nossas
                raízes italianas com a vibrante diversidade culinária
                brasileira. Aventuras Gastronômicas: Somos amantes de aventuras,
                e isso se reflete em cada prato que servimos. Das ruelas
                pitorescas da Itália às praias tropicais do Brasil, nossa
                jornada culinária é uma viagem de sabores e experiências que
                queremos compartilhar com você. Açaí Tropical: O açaí representa
                a tropicalidade e energia do Brasil, algo que incorporamos em
                nossos pratos. Nossos bowls de açaí são uma homenagem à
                exuberância da natureza e à vitalidade que ela nos proporciona.
                Hot Dogs Artesanais: A praticidade do hot dog é uma celebração
                da diversidade culinária brasileira. Na Casa Santê,
                transformamos esse clássico em algo especial, com combinações
                únicas e ingredientes selecionados para criar uma explosão de
                sabores em cada mordida. Amor na Cozinha: A Casa Santê é o
                resultado da combinação perfeita de amor e paixão pela
                culinária. Cada prato é preparado com cuidado e dedicação,
                refletindo não apenas nossas habilidades na cozinha, mas também
                o amor que temos um pelo outro.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-900">
                Junte-se a nós na Casa Santê, onde cada refeição é uma
                celebração da vida, da cultura e do amor. Experimente a
                autenticidade dos sabores italianos e a ousadia dos pratos
                tropicais, tudo em um ambiente acolhedor e cheio de charme.
              </p>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
                className="font-bold text-gray-800 mt-8"
              >
                Veja nosso instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section data-aos="fade-up" className="relative py-20">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: '80px' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full  md:w-4/12  ">
              <img
                alt="..."
                className="max-w-full  rounded-lg shadow-lg"
                src="https://agriculturaemar.com/wp-content/uploads/2019/08/acai-6-1539021465652_v2_750x421-859x639-660x330.jpg"
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <h3 className="text-3xl font-semibold">Nossos produtos</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Na Casa Santê, acreditamos que a essência de uma experiência
                  gastronômica excepcional reside na qualidade e frescor dos
                  ingredientes que utilizamos. Somos apaixonados por oferecer
                  aos nossos clientes uma jornada culinária única, onde cada
                  prato é uma celebração dos sabores puros e autênticos da
                  natureza.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Frescos</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Qualidade</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Carinho</h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 relative block bg-gray-900">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: '80px' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Contatos</h2>
            </div>
          </div>
          <div className="flex flex-wrap mt-12 justify-center">
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-medal text-xl"></i>
              </div>
              <h6 className="text-xl mt-5 font-semibold text-white">
                Instagram
              </h6>
              <p className="mt-2 mb-4 text-gray-500">
                Aqui você pode ver um pouco mais do nosso dia a dia
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-poll text-xl"></i>
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">Email</h5>
              <p className="mt-2 mb-4 text-gray-500">
                Aqui você pode tirar duvidas, fazer criticas construtivas,
                sugestões
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-lightbulb text-xl"></i>
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">
                Facebook
              </h5>
              <p className="mt-2 mb-4 text-gray-500">
                {/* Aqui temos mldkvkjd vjhbvk revjhefbvk fnvbn kje hjkb nbf hjfe
                befnb jfenm jhmn */}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
