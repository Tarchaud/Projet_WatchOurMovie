#!/bin/bash

# Attendre que MySQL soit prêt à accepter des connexions
until output=$(mysqladmin ping -h mysql 2>&1) || [[ $output == *"mysqld is alive"* ]]; do
  echo "MySQL n'est pas encore prêt - en attente..."
  echo "Output: $output"
  sleep 1
done

echo "MySQL est prêt !"