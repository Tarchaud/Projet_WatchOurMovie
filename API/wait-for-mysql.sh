#!/bin/bash

# Attendre que MySQL soit prêt à accepter des connexions
until mysqladmin ping -h mysql > /dev/null 2>&1; do
  echo "MySQL n'est pas encore prêt - en attente..."
  sleep 1
done

echo "MySQL est prêt !"