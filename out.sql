PGDMP     &    ,                v        	   books_app    10.4    10.4     �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �
           1262    24986 	   books_app    DATABASE     �   CREATE DATABASE books_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE books_app;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �
           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    6            �
           0    0    SCHEMA public    ACL     &   GRANT ALL ON SCHEMA public TO PUBLIC;
                  postgres    false    6                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �
           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    24989    books    TABLE     
  CREATE TABLE public.books (
    book_id integer NOT NULL,
    author character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    isbn character varying(21) NOT NULL,
    image_url character varying(255),
    description character varying(255)
);
    DROP TABLE public.books;
       public         postgres    false    6            �            1259    24987    books_book_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.books_book_id_seq;
       public       postgres    false    6    197            �
           0    0    books_book_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.books_book_id_seq OWNED BY public.books.book_id;
            public       postgres    false    196            o
           2604    24992    books book_id    DEFAULT     n   ALTER TABLE ONLY public.books ALTER COLUMN book_id SET DEFAULT nextval('public.books_book_id_seq'::regclass);
 <   ALTER TABLE public.books ALTER COLUMN book_id DROP DEFAULT;
       public       postgres    false    197    196    197            �
          0    24989    books 
   TABLE DATA               U   COPY public.books (book_id, author, title, isbn, image_url, description) FROM stdin;
    public       postgres    false    197   �       �
           0    0    books_book_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.books_book_id_seq', 5, true);
            public       postgres    false    196            q
           2606    24999    books books_isbn_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_isbn_key UNIQUE (isbn);
 >   ALTER TABLE ONLY public.books DROP CONSTRAINT books_isbn_key;
       public         postgres    false    197            s
           2606    24997    books books_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (book_id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public         postgres    false    197            �
   �  x��U�o�F6Ŵ�88@�PE ��zi/�U��iY��]w?pݿ�3��6�"�Z		������Yr�9�t;t!�D����Տ�	,.���4g��b��!�ߝ��=����ИJ[��Қ�&|���UV>�Ngo׿N���)<ʭY��H{D7TU�̆X[-gC�\������$.���(j��X�m�!�"?R��Ѓ��{5��C��u�~#`���s���Ptb{� G��	��B��l�t�	:�Z LN�l(î<�R[[3c+�+	5�Z���B���RU�G��졲>��^��LT#(Ӧ���V���J�rc�:Y;!������HuG��3M����b>�|�&�6s���z�z{��E�����G�uei��PG����Y�Y�}h�C@S(���?(�INB"�T��>е.�2RG"��jg'����|Z�{��oБ����-u��5Jb:�$?[�7�S���H��a���=�\Lf��|�zn�O�7�����5ܾ��w�D���4R��z��kVR������!�~��6t�䟚�z7-�S�_�=K��:�I�ȯZbt��d_w���WĨ�M�*j�~&t��B���P&L��pE!�r�i.��=��f��t�t��?m�7��i�PF�	d��ik0�"�Na�2�hh}8��ɠ�k�N���D��T5��0��?2�'f�S=��V�r\i�i�sʑ+���r�=#�+Р����Uh�c_��T�{�݋��֚<̒�K���ɭCZz�Eѫ�FT�H�/'��"�ҿ��yhV�uP�Q�g�Bs8�INE�����^���Ӓ��x�"5@�����V���1,C�@S�<��<J�w�+�na�cǺ�B{N;%�p%���y��Kr��mM/�5�Ωk�h�Q��W'_��`0�;ܑ�     