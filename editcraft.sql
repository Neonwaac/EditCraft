-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2025 a las 16:40:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `editcraft`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `id_plantilla` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `comentario`, `id_plantilla`, `id_usuario`) VALUES
(4, 'Me gustó esta plantilla', 4, 2),
(5, 'A mi no me gustó', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantilla`
--

CREATE TABLE `plantilla` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `foto` varchar(250) NOT NULL,
  `url` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plantilla`
--

INSERT INTO `plantilla` (`id`, `titulo`, `foto`, `url`, `timestamp`) VALUES
(4, 'Naturaleza', 'https://picsum.photos/id/1018/400/300', 'https://picsum.photos/id/1018/400/300', '2025-06-07 14:28:15'),
(5, 'Zeus Samir', 'https://picsum.photos/id/1025/400/300', 'https://picsum.photos/id/1025/400/300', '2025-06-07 14:28:15'),
(6, 'Blog Personal', 'https://picsum.photos/id/1035/400/300', 'https://picsum.photos/id/1035/400/300', '2025-06-07 14:28:15'),
(7, 'E-commerce Tech', 'https://picsum.photos/id/1040/400/300', 'https://picsum.photos/id/1040/400/300', '2025-06-07 14:28:15'),
(8, 'Landing Page Creativa', 'https://picsum.photos/id/1042/400/300', 'https://picsum.photos/id/1042/400/300', '2025-06-07 14:28:15'),
(10, 'Currículum Online', 'https://picsum.photos/id/1052/400/300', 'https://picsum.photos/id/1052/400/300', '2025-06-07 14:28:15'),
(11, 'Galería Fotográfica', 'https://picsum.photos/id/1060/400/300', 'https://picsum.photos/id/1060/400/300', '2025-06-07 14:28:15'),
(12, 'Revista Digital', 'https://picsum.photos/id/1068/400/300', 'https://picsum.photos/id/1068/400/300', '2025-06-07 14:28:15'),
(13, 'Blog de Viajes', 'https://picsum.photos/id/1070/400/300', 'https://picsum.photos/id/1070/400/300', '2025-06-07 14:28:15'),
(14, 'Tienda de Ropa', 'https://picsum.photos/id/1080/400/300', 'https://picsum.photos/id/1080/400/300', '2025-06-07 14:28:15'),
(15, 'Aplicación de Finanzas', 'https://picsum.photos/id/1084/400/300', 'https://picsum.photos/id/1084/400/300', '2025-06-07 14:28:15'),
(16, 'Gestor de Proyectos', 'https://static.wikia.nocookie.net/leagueoflegends/images/b/be/Aspecto_centrado_-_Kayn_Base.jpg/revision/latest/scale-to-width-down/1200?cb=20231113041337&path-prefix=es', 'https://static.wikia.nocookie.net/leagueoflegends/images/b/be/Aspecto_centrado_-_Kayn_Base.jpg/revision/latest/scale-to-width-down/1200?cb=20231113041337&path-prefix=es', '2025-06-07 14:28:15'),
(17, 'Sitio para Eventos', 'https://picsum.photos/id/109/400/300', 'https://picsum.photos/id/109/400/300', '2025-06-07 14:28:15'),
(18, 'Red Social', 'https://picsum.photos/id/110/400/300', 'https://picsum.photos/id/110/400/300', '2025-06-07 14:28:15'),
(19, 'Educación Online', 'https://picsum.photos/id/111/400/300', 'https://picsum.photos/id/111/400/300', '2025-06-07 14:28:15'),
(20, 'Sitio de Podcast', 'https://picsum.photos/id/112/400/300', 'https://picsum.photos/id/112/400/300', '2025-06-07 14:28:15'),
(21, 'Galería de Arte', 'https://picsum.photos/id/113/400/300', 'https://picsum.photos/id/113/400/300', '2025-06-07 14:28:15'),
(22, 'Plantilla para ONG', 'https://picsum.photos/id/114/400/300', 'https://picsum.photos/id/114/400/300', '2025-06-07 14:28:15'),
(23, 'Página de Música', 'https://picsum.photos/id/115/400/300', 'https://picsum.photos/id/115/400/300', '2025-06-07 14:28:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `token` varchar(250) NOT NULL,
  `foto` varchar(250) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `correo`, `password`, `token`, `foto`, `timestamp`) VALUES
(1, 'yo', 'jomaparo3103@gmail.com', '$2b$10$FNZuuZb39804rClHGFGlZeI612xRW338xNlsClRqW20lyuyOkvEm2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ5byIsImlhdCI6MTc0OTMwNjc1NiwiZXhwIjoxNzQ5MzEwMzU2fQ.BH97GUMzWHjO3hwVDJLwATtG2gVfY5m6rCGLiDhnjwM', 'http://localhost:8077/uploads/images/usuarios1neonwaac.png', '2025-06-07 14:32:36'),
(2, 'crixs', 'cristian1', '$2b$10$7D1wXO9bJxbAn1LaEWF7ee3iF16WtD2mZWs6/1aH46ALXzDlReKt.', '', 'http://localhost:8077/uploads/images/usuarios2cristian.png', '2025-06-07 14:30:46');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_plantilla` (`id_plantilla`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `plantilla`
--
ALTER TABLE `plantilla`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `plantilla`
--
ALTER TABLE `plantilla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_plantilla`) REFERENCES `plantilla` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
