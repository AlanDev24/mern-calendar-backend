const { response } = require("express");
const Evento = require("../models/evento");
const evento = require("../models/evento");

const getEventos = async (req, res = response) => {
  try {
    const eventos = await Evento.find().populate("user", "name");
    return res.status(200).json({
      ok: true,
      eventos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "error al cargar eventos",
    });
  }
};

const createEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    console.log(req.uid);

    const eventoGuardado = await evento.save();

    res.status(200).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error al guardar el evento",
    });
  }
};

const updateEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const evento = await Evento.findById(eventoId);
    const uid = req.uid;

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: "No tiene permiso para editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error al actualizar evento",
    });
  }
};

const deleteEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const evento = await Evento.findById(eventoId);
    const uid = req.uid;

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        msg: "No tiene permiso para eliminar este evento",
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
      evento: eventoEliminado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error al borrar evento",
    });
  }
};

module.exports = {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento,
};
