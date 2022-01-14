import React, { useState } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import "./Home.css";


const TutoModal = ({ isShown, handleClose }) => {
  return (
    <Modal size="lg" show={isShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rules of Play</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <p>
            Like many of its contemporaries, Squadro’s rules are simple enough
            to explain in a few sentences, but smart enough to hide a lot of
            careful choices going on behind the scenes. In Squadro, two players
            are racing to cross the board and then get home again. One player
            moves their pieces in a straight line horizontally, while the other
            player only moves perpendicular to them. All of your pieces exist on
            a single axis of movement: while the game is played in two
            dimensions, each piece only ever moves in one.
          </p>
        </Row>
        <Row>
          <p>Each piece moves an amount of spaces shown by the dots beside its
          starting slot. Every turn, a player chooses one of their five pieces
          and moves it forward. If that piece reaches the edge of the board, it
          turns around, and will move the opposite direction on future turns (in
          the hopes of getting back home).</p>
          <p>If a player gets four of their five
          pieces home, they win. There are a few clever tricks here that make
          Squadro the tense game of tactical negotiation that it is. The first
          is what happens when a piece crosses paths with an opponent piece. If
          your piece is supposed to land on or pass over one or more opponent
          pieces, it passes over, then lands on the next available space. The
          opponent piece (or pieces) is then sent back to whatever side it just
          came from. Sometimes that’s okay. Sometimes it hurts. This is because
          Squadro has a twist that makes rushing difficult. Each player has some
          pieces that move a single space per turn. They also have pieces that
          can jaunt along at three spaces a pop. When either of these pieces
          reaches the end of the board, their movement speed is flipped. Coming
          back home, that three space sprinter is now crawling along at one
          space a turn (oof). On the other hand, if you managed to get a
          single-spacer all the way to the end, now it can bolt back home at
          three spaces a turn. This means that players are constantly trying to
          position their pieces to minimize losses, all while threatening their
          opponent’s pieces with some clever positioning. The game quickly
          becomes a stand-off. Since you can’t pass on your turn, this is an
          impasse that someone will be forced to break — whether they want to or
          not.</p>
        </Row>
        <Row className="justify-content-end my-3">
          <Col md="auto" className="p-0">
            <Button variant="dark" className="mx-5" onClick={handleClose}>
              Close
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default TutoModal;
