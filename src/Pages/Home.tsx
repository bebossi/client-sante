import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { RestaurantContext } from "../auth/restaurantContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api";


const Home = () => {
  const navigate = useNavigate();
  const restaurantContext = useContext(RestaurantContext);
  const isOpen = restaurantContext?.isOpen;
  console.log(isOpen);
  const getUser = async () => {
    try {
			const  data = await api.get(`/login/success`);
      console.log(data)
      // navigate(data.redirectUrl)
    } catch (err) {
			console.log(err);
		}
   }

  useEffect(() => {
    getUser()

    if (isOpen === null) {
      return;
    }
    try {
      if (!isOpen)
        toast(
          "Restaurante está fechado, só é possível fazer pedidos por agendamento para buscar na loja",
          {
            duration: 8000,
            position: "bottom-center",
          }
        );
      } catch (err) {
        console.log(err);
      }
  }, [isOpen]);

  return (
    <>
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: "75vh",
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
                  Nossos pratos são feitos com carinho, atenção ndkjvnf fbhbvf
                  ve gtegteg rgwg frwg regrwgrw rwgtrwt twretrwt etwtewt tewtew
                  jbeiufbjehr rhiehtnkje tewt htihkewytiewht w
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
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
              className="text-red-200 fill-current "
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <section className="pb-20 bg-red-200 -mt-24">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-wrap">
            <div
              className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center mt-6 "
              onClick={() => navigate("/menu")}
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
                    Delicious açai served with a creamy blend, topped with fresh
                    berries and a drizzle of honey.fgtrhtrhtrhrthrthr oihoire
                    frwoieFD NKJBB
                  </p>
                </div>
              </div>
            </div>

            <div
              className="lg:pt-12 pt-5 w-full md:w-4/12 px-4 text-center "
              onClick={() => navigate("/menu")}
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
                    Massas deliciosas, molhos caseiros, carnes com cortes
                    especiais ...... sjfvnjkf vfkjbvkjf v fsjhb
                  </p>
                </div>
              </div>
            </div>

            <div
              className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center mt-6 "
              onClick={() => navigate("/menu")}
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
                    Hot dog , carne especial, molho caseiro, com adicionais a
                    sua escolha, personalixado por voce feito com carionho por
                    nos
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Quem somos
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                Somos um casal que ama a gastronomia, e decidimos iniciar essa
                jornada de levar a melhor comida para a mesa da sua csa nbdvkjhg
                khgk hgkjrhg kjebkjgekj ganoihgoihagoi hourt uoir tuoreit hroi
                thirut joiyhroiyhroiy oiryhaio
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                Somos um casal que ama a gastronomia, e decidimos iniciar essa
                jornada de levar a melhor comida para a mesa da sua csa nbdvkjhg
                khgk hgkjrhg kjebkjgekj ganoihgoihagoi hourt uoir tuoreit hroi
                thirut joiyhroiyhroiy oiryhaio
              </p>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
                className="font-bold text-gray-800 mt-8"
              >
                Veja nosso instagram
              </a>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-l">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block"
                    style={{
                      height: "95px",
                      top: "-94px",
                    }}
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-red-200 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Top Notch Services
                  </h4>
                  <p className="text-md font-light mt-2 text-black">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px" }}
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
                  Nossos produtos são selecionados a dedo por nós, gostamos
                  iorhgoireklgre,re rghtey rhyeyreyeyr eythbenbrf ,btryynbry
                  brtb rthb,rtnh rt,tr ,h trh tr,h rt,ht htrw vrenlvtr bjnet bkvtrjb tr bkjrtbjkv trkb trkj bktrjbvjtrjb trkjb ktje bkjt ebkjt bvjkt ebvkjtr 
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

      {/* <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">Here are our heroes</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                According to the National Oceanic and Atmospheric
                Administration, Ted, Scambos, NSIDClead scentist, puts the
                potentially record maximum.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  // src={require("assets/img/team-1-800x800.jpg").default}
                  className="shadow-lg rounded-full max-w-full mx-auto"
                  style={{ maxWidth: "120px" }}
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Ryan Tompson</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Web Developer
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  // src={require("assets/img/team-2-800x800.jpg").default}
                  className="shadow-lg rounded-full max-w-full mx-auto"
                  style={{ maxWidth: "120px" }}
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Romina Hadid</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Marketing Specialist
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  // src={require("assets/img/team-3-800x800.jpg").default}
                  className="shadow-lg rounded-full max-w-full mx-auto"
                  style={{ maxWidth: "120px" }}
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Alexa Smith</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    UI/UX Designer
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src="massa.webp"
                  className="shadow-lg rounded-full max-w-full mx-auto"
                  style={{ maxWidth: "120px" }}
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Jenna Kardi</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Founder and CEO
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="pb-20 relative block bg-gray-900">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px" }}
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
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                Trabalhamos para oferecer o melhor serviço possivel ,
                kjbdvkjds,et ew,tew,tew,t e,t ,ew
              </p>
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
                Aqui você pode ver um pouco mais do nosso dia a dia,
                blabalbalbal blaalba da sfl sklb
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-poll text-xl"></i>
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">Email</h5>
              <p className="mt-2 mb-4 text-gray-500">
                Aqui você pode tirar duvidas, fazer criticas construtivas,
                sugesto~es bklasbfkjasbfkjdb
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
                Aqui temos mldkvkjd vjhbvk revjhefbvk fnvbn kje hjkb nbf hjfe
                befnb jfenm jhmn
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
