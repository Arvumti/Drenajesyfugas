-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2014 a las 19:38:26
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

USE db_drenajes;


SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;    
                            
--
-- Base de datos: `db_drenajes`
--
-- --------------------------------------------------- -------------------------------------------------Users

--
-- Estructura de tabla para la tabla ``
--
DROP TABLE `usuarios`;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(13) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) DEFAULT NULL,
  `pass` varchar(11) DEFAULT NULL,
  
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;


--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `usuario`, `pass`) VALUES
(1, NULL, NULL),
(2, NULL, NULL),
(3, NULL, NULL);
-- --------------------------------------------------- -------------------------------------------------Empresas

DROP TABLE `empresas`;

CREATE TABLE IF NOT EXISTS `empresas` (
  `idEmpresa` int(13) NOT NULL AUTO_INCREMENT,
  `empresa` varchar(50) DEFAULT NULL,
  `direccion` varchar(80) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `logo` varchar(30) DEFAULT NULL,
  `mail` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idEmpresa`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;


--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`idEmpresas`, `empresa`,`direccion`,`telefono`,`logo`, `mail`) VALUES
(1, NULL,NULL,NULL,NULL, NULL),
(2, NULL,NULL,NULL,NULL, NULL),
(3, NULL,NULL,NULL,NULL, NULL);
-- --------------------------------------------------- -------------------------------------------------Reportes
DROP TABLE `reportes`;

CREATE TABLE IF NOT EXISTS `reportes` (
  `folio` int(13) NOT NULL AUTO_INCREMENT,
  `idEmpresa` varchar(50) DEFAULT NULL,
  `tipo` varchar(80) DEFAULT NULL,
  `atendio` varchar(60) DEFAULT NULL,
  `responsable` varchar(60) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaTermino` date DEFAULT NULL,
  `areas` varchar(60) DEFAULT NULL,
  `observaciones` varchar(400) DEFAULT NULL,
  `pumbometro` int() DEFAULT NULL,
   PRIMARY KEY (`folio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;


--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`folio`,`idEmpresas`, `tipo`,`atendio`,`responsable`,`fechaInicio`,`fechaTermino`, `areas`,`observaciones`,`pumbometro`) VALUES
(1, NULL,NULL,NULL,NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL,NULL,NULL,NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL,NULL,NULL,NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------- -------------------------------------------------Servicios

DROP TABLE `servicios`;

CREATE TABLE IF NOT EXISTS `servicios` (
  `idServicio` int(13) NOT NULL AUTO_INCREMENT,
  `servicio` varchar(50) DEFAULT NULL,
  `imgServicio` varchar(80) DEFAULT NULL,
  `vidServicio` varchar(70) DEFAULT NULL,
   PRIMARY KEY (`idServicio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;


--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idServicio`,`servicio`, `imgServicio`,`vidServicio`) VALUES
(1, NULL,NULL,NULL),
(2, NULL,NULL,NULL),
(3, NULL,NULL,NULL);
-- --------------------------------------------------- -------------------------------------------------BLOG

DROP TABLE `blog`;

CREATE TABLE IF NOT EXISTS `blog` (
  `idPost` int(13) NOT NULL AUTO_INCREMENT,
  `post` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `imgPost` varchar(70) DEFAULT NULL,
  `vidPost` varchar(70) DEFAULT NULL,
  `autor` varchar(70) DEFAULT NULL,
  `categoria` varchar(70) DEFAULT NULL,
   PRIMARY KEY (`idPost`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;


--
-- Volcado de datos para la tabla `blog`
--

INSERT INTO `blog` (`idPost`,`post`,`fecha`,`imgPost`,`vidPost`,`autor`, `categoria`) VALUES
(1, NULL,NULL,NULL,NULL,NULL,NULL),
(2, NULL,NULL,NULL,NULL,NULL,NULL),
(3, NULL,NULL,NULL,NULL,NULL,NULL);

-- --------------------------------------------------- -------------------------------------------------FAQ
DROP TABLE `faq`;

CREATE TABLE IF NOT EXISTS `faq` (
  `idFaq` int(13) NOT NULL AUTO_INCREMENT,
  `faq` varchar(50) DEFAULT NULL,
  `respuesta` varchar(100) DEFAULT NULL,
  
   PRIMARY KEY (`idFaq`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;


--
-- Volcado de datos para la tabla `faq`
--

INSERT INTO `faq` (`idFaq`,`faq`,`respuesta`) VALUES
(1, NULL,NULL),
(2, NULL,NULL),
(3, NULL,NULL);
-- --------------------------------------------------- -------------------------------------------------HOME
DROP TABLE `home`;

CREATE TABLE IF NOT EXISTS `home` (
  `idHome` int(13) NOT NULL AUTO_INCREMENT,
  `imgSlide` varchar(50) DEFAULT NULL,
  
   PRIMARY KEY (`idHome`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=200 ;


--
-- Volcado de datos para la tabla `faq`
--

INSERT INTO `home` (`idHome`,`imgSlide`) VALUES
(1, NULL),
(2, NULL),
(3, NULL);










