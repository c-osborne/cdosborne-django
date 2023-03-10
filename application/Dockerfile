FROM continuumio/miniconda3

WORKDIR /djangoserver
COPY environment.yml /djangoserver/
RUN conda env create -f environment.yml

ADD . /djangoserver/



# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "django", "/bin/bash", "-c"]
SHELL ["conda", "update", "--all", "/bin/bash", "-c"]
# The code to run when container is started:
ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "django"]