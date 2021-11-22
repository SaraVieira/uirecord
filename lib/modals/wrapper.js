import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { WrapperEl } from "../../components/Modals/Wrapper";

import { modals } from "./modals";

export const PARAMS_KEY = "params";
export const MODAL_KEY = "modal";

function useCustomEvent(eventName, listener) {
  useEffect(() => {
    window.addEventListener(eventName, listener);

    return () => {
      window.removeEventListener(eventName, listener);
    };
  }, [eventName, listener]);
}

const createURL = (urlParams) => {
  const {
    location: { protocol, host, pathname },
  } = window;
  const search = urlParams.toString();
  return `${protocol}//${host}${pathname}${search.length ? "?" : ""}${search}`;
};

export const encodeUrlParams = (obj) => btoa(encodeURI(JSON.stringify(obj)));
export const decodedUrlParams = () =>
  JSON.parse(
    decodeURI(atob(new URLSearchParams(window.location.search).get(PARAMS_KEY)))
  );
/**
 * Opens a new modal
 * @param {Object} modal - All the modal info
 * @param {string} modal.name - Name of the modal you want to open. Modal Definitions - {@link src/components/Modal/modals.js}
 * @param {string} modal.params - Any params to pass, this needs to be serializble
 * @param {any} modal.props - Pass anything like an onSubmit that you want to run after modal closes
 */

export const openModal = ({ name, params, ...props }) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(MODAL_KEY, name);
  if (params) {
    urlParams.set(PARAMS_KEY, encodeUrlParams(params));
  }

  Router.push(createURL(urlParams), undefined, { shallow: true });
  const event = new CustomEvent("modal-trigger", { detail: props });
  window.dispatchEvent(event);
};

export const closeModal = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modalName = urlParams.get(MODAL_KEY);
  if (urlParams.get(PARAMS_KEY)) {
    urlParams.delete(PARAMS_KEY);
  }
  urlParams.delete(MODAL_KEY);

  Router.push(createURL(urlParams), undefined, { shallow: true });
  window.dispatchEvent(new Event("modal-trigger"));
  window.dispatchEvent(new Event(`${modalName}-close`));
};

export const isModalOpen = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  const modalName = urlParams.get(MODAL_KEY);

  return modalName === name;
};

const ModalWrapper = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [extraProps, setExtraProps] = useState({});

  const listener = (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const modalQuery = urlParams.get(MODAL_KEY);

    if (!modalQuery) {
      setShow(false);
      setExtraProps({});
    }
    if (modalQuery && modals[modalQuery]) {
      setShow(true);
      if (event?.detail) setExtraProps(event.detail);
    }
  };
  useCustomEvent("modal-trigger", listener);
  useCustomEvent("popstate", listener);

  useEffect(() => {
    // load modal if a modal is on the url at load
    listener();
  }, [router.query]);

  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const getData = () => {
    const urlData = urlParams.get(PARAMS_KEY);
    if (!urlData) return null;
    try {
      return decodedUrlParams();
    } catch {
      return null;
    }
  };
  const modalName = urlParams.get(MODAL_KEY);
  const onSubmit = () => window.dispatchEvent(new Event(`${modalName}-submit`));

  const onClose = () => closeModal();
  const Component = modals[modalName];

  return show && Component ? (
    <WrapperEl onClose={onClose}>
      <Component
        onCancel={onClose}
        open={show}
        onSubmit={onSubmit}
        data={getData()}
        {...extraProps}
      />
    </WrapperEl>
  ) : null;
};
export default ModalWrapper;
