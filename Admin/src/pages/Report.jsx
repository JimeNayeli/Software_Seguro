import React from 'react'
import ImageConstruction from './../assets/Section_Construction_image.png'

export default function Report() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={ImageConstruction}
        alt="Descripción de la imagen"
        className="max-w-full max-h-full"
      />
    </div>
  )
}
