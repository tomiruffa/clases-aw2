-- Tablas con los datos del parcial 1 (antes estaban en los JSON)

CREATE TABLE productos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL
);

INSERT INTO productos (nombre, categoria, precio, stock) VALUES
    ('Medialuna de manteca',    'laminados', 1200, 120),
    ('Medialuna de grasa',      'laminados',  950, 150),
    ('Croissant clasico',       'laminados', 2800,  60),
    ('Pan de chocolate',        'laminados', 3500,  45),
    ('Palmera de hojaldre',     'laminados', 1800,  80),
    ('Cañón de dulce de leche', 'laminados', 2200,  40),
    ('Pan de campo',            'panes',     4200,  30),
    ('Baguette',                'panes',     3000,  35),
    ('Pan de miga',             'panes',     6500,  20),
    ('Alfajor de maicena',      'dulces',    1500,  90),
    ('Budín de limón',          'dulces',    5200,  18),
    ('Tarta de ricota',         'dulces',    3900,  25);

-- Historial de ejecuciones del procedimiento (lo llena el middleware guardarResultado)
CREATE TABLE resultados_procedimiento (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    procedimiento VARCHAR(100) NOT NULL,
    fecha TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    parametros JSONB NOT NULL,
    procesado JSONB NOT NULL,
    resultado JSONB NOT NULL
);
